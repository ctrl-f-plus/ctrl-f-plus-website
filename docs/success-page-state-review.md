# Success page state review

Reviewed on October 4, 2026, against the website and the sibling
`extension-rewrite` working trees. The state inventory below was derived from
extension execution paths, backend contracts, and existing tests. The success
page's existing state definitions were excluded as evidence.

The review was read-only. No checkout or activation requests were run, the tests
were inspected rather than executed, and live Polar configuration was not
verified. This document records the findings and design recommendations; it does
not implement them. Links into `extension-rewrite` assume that repository remains
beside this website repository.

The page needs to distinguish purchase verification from whether paid access is
usable in this browser. A checkout reference, a saved key, and a completed device
activation establish different facts. Ten state families cover the observed flow,
with recovery variants inside the failure states. Some situations currently
collapse into the same response, so the page cannot distinguish all of them yet.

The actual flow is: verify checkout, retrieve license, save license, activate this
browser, then verify paid access. A stored license causes the extension to skip
that entire flow. See the
[checkout handler](../../extension-rewrite/apps/extension/src/background/messaging/runtime-message-handlers.ts#L143).

| State to design                                            | What actually happened                                                                                                                                                                                      | What the page should communicate or offer                                                                                                              |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **1. Checkout reference missing or malformed**             | The URL lacks `checkout_id`, contains an empty value, or fails the API's UUID validation. Missing references stop the bridge silently; malformed references become a generic failure if they reach the API. | Explain that automatic setup cannot use this link. Provide instructions for signing in through extension Settings using the purchase email.            |
| **2. Checking for an extension connection**                | The page has loaded, but the extension has not begun the handshake.                                                                                                                                         | Show a bounded waiting state without claiming that payment or activation has been verified.                                                            |
| **3. No extension connection established**                 | No bridge response arrives. Possible causes include an absent or disabled extension, another browser or profile, restricted access, an older build, or an integration problem.                              | Say that the page could not connect to the extension. Offer installation or enabling instructions, the correct browser or profile, and manual sign-in. |
| **4. Automatic setup in progress**                         | Checkout exchange, license retrieval, persistence, activation, or verification is running.                                                                                                                  | Show one setup indicator. The current bridge provides no progress events that distinguish these stages.                                                |
| **5. Paid access confirmed for this browser**              | Activation and verification completed, and the extension derived usable paid access.                                                                                                                        | Show the completed state and instructions for using the extension.                                                                                     |
| **6. A license is already saved here**                     | The extension found a stored key and returned immediately. It did not validate this checkout, the key's current access, or whether this purchase matches that key.                                          | Use neutral wording and direct the user to Settings. This response does not justify saying that the new purchase is activated.                         |
| **7. Automatic setup could not be completed**              | Reading stored credentials, exchanging the checkout, retrieving the license, or storing the license failed. The underlying reason is discarded.                                                             | Offer manual sign-in and an appropriate retry path. Avoid claiming that payment failed.                                                                |
| **8. License retrieved, but device setup needs attention** | The license was saved, but activating this browser or confirming its access encountered a problem.                                                                                                          | Preserve the distinction from an unsuccessful purchase. Show the appropriate recovery variant below.                                                   |
| **9. Paid access is not unlocked**                         | The final access calculation returned a reason other than usable paid access.                                                                                                                               | Explain the reported reason and provide its recovery action. Several reasons currently disappear before reaching the page.                             |
| **10. Activation outcome unknown**                         | The handshake exceeded 45 seconds, or communication failed without a dependable outcome.                                                                                                                    | Explain that confirmation was unavailable. Direct the user to check Settings before retrying. Background activation may still finish.                  |

These are design families, not ten independently observable responses in the
current implementation. Missing or malformed references can be checked locally.
The background response distinguishes confirmed access, an existing stored
license, a generic failure, an activation failure with a reason, and locked access
with a reason. The content script collapses some of that information when it
updates the DOM. See the
[response contract](../../extension-rewrite/apps/extension/src/core/messaging/contract.ts#L30)
and
[bridge output](../../extension-rewrite/apps/extension/src/contentScripts/checkout-success/checkout-success.ts#L38).

The handshake timeout does not cancel the background request, and its eventual
response does not update the page after the timeout wins. Missing checkout
references and missing DOM elements cause an immediate, silent exit. The bridge
looks for `#ext-activation` once, so an element mounted afterward does not start
the handshake. See the
[handshake implementation](../../extension-rewrite/apps/extension/src/contentScripts/checkout-success/checkout-success.ts#L72).

No connection cannot reliably mean that the extension is not installed. Chrome
controls injection through matching URLs and permissions, and incognito access
requires separate permission. See
[Chrome content scripts](https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts)
and
[Chrome permissions](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions).

The device-setup failure has three actual variants in this checkout path:

| Variant                                                         | Actual meaning                                                                                                                         | Recovery                                                                                              |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **All seats are occupied** (`seatsFull`)                        | Activation returned HTTP 409.                                                                                                          | Manage devices in Settings, revoke another activation if appropriate, then retry activation.          |
| **License key not recognized** (`notFound`)                     | Activation returned HTTP 404. In this flow, that concerns the license key; it does not establish that a particular device was removed. | Retrieve the license again through sign-in; contact support if it persists.                           |
| **Activation or verification could not finish** (`unavailable`) | Network errors, service errors, rate limits, rejected provider requests, storage failures, or a deferred final verification.           | Check or retry activation in Settings. Do not assert a specific cause such as the user being offline. |

The shared failure type also contains `noLicense` and `conflict`, but this
checkout handler does not emit those as activation-failure reasons. They do not
require additional checkout screens. See the
[failure mapping](../../extension-rewrite/apps/extension/src/background/licensing/seat-lifecycle.ts#L48)
and
[checkout activation handling](../../extension-rewrite/apps/extension/src/background/messaging/runtime-message-handlers.ts#L165).

For the final access calculation, these are the complete reason values and their
design implications. They are not all ordinary fresh-checkout outcomes.

| Access reason                | Meaning and treatment                                                                                                                                                                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `unseated`                   | This installation has no recognized activation. Direct the user to reactivate it in Settings.                                                                                                                                        |
| `licenseExpired`             | The license's access period has expired. Direct the user to review the purchase or renewal in the customer portal.                                                                                                                   |
| `licenseInactive`            | The license is revoked or disabled. Offer account review and support.                                                                                                                                                                |
| `unknownKey`                 | Verification could not find the license key. Offer sign-in recovery and support.                                                                                                                                                     |
| `noLicense`                  | Credentials disappeared during the operation, for example through concurrent sign-out. Offer sign-in again.                                                                                                                          |
| `activating`                 | The stored data does not yet establish usable access. This can also follow unusable verification data, so it should not create an indefinite spinner.                                                                                |
| `seatsFull` or `claimFailed` | The local activation state changed during processing. Reuse the corresponding activation recovery treatment above.                                                                                                                   |
| `offlineTooLong`             | Previously verified access exceeded the 14-day verification allowance. This is a general extension state, not an ordinary fresh-checkout outcome. A normal revisit with a saved key currently takes the early-return branch instead. |

These reasons come from the actual access calculation. They should not
automatically become nine separate page layouts. A shared recovery layout can
cover several of them. Only show a specific reason when it is reported; an API or
provider rejection before detailed status is read can instead become a generic
failure. See the
[access calculation](../../extension-rewrite/apps/extension/src/core/licensing/license-access.ts#L98),
[access expiry policy](../../extension-rewrite/apps/extension/src/core/licensing/entitlement-policy.ts#L80),
[verification handling](../../extension-rewrite/apps/extension/src/background/licensing/entitlement-refresh.ts#L55),
and
[provider error translation](../../extension-rewrite/apps/api/src/modules/licensing/polar-errors.ts#L11).

The generic setup failure conceals several situations that matter when writing
the copy:

- **Automatic checkout recovery has expired.** The limit is one hour from
  checkout creation, not payment completion or arrival on the success page. This
  does not mean the purchased license expired.
- **Checkout is not successful or cannot be found.** The API accepts only
  `succeeded`. It also rejects a missing customer association. Polar's `confirmed`
  status means the customer clicked Pay; it does not establish successful
  payment. The other documented checkout statuses are `open`, `expired`, and
  `failed`.
- **The license has not appeared yet.** License retrieval retries HTTP 404 four
  times after the initial attempt, with two-second delays. That is five attempts
  and eight seconds of waiting, plus request time. Exhaustion becomes a generic
  failure. The same 404 can also mean that no granted license was found.
- **Authentication, service, response parsing, or storage failed.** These also
  collapse into the same outcome.

Separate payment-pending, checkout-expired, license-preparation, and
service-unavailable messages would require more information to reach the page.
The current response cannot select them reliably. See the
[checkout checks](../../extension-rewrite/apps/api/src/modules/licensing/endpoints/exchange-checkout.endpoint.ts#L65),
[license retries](../../extension-rewrite/apps/extension/src/core/licensing/licensing-api.ts#L43),
and
[Polar checkout statuses](https://polar.sh/docs/api-reference/2026-04/checkouts/get-checkout-session).

Four integration findings affect which designs can work:

1. **The website's success route is outside the current production bridge
   match.** The extension registers the checkout script against
   `api.ctrl-f.plus/success*`. The website serves the apex, `www`, and preview
   hosts. The checked-in Polar checkout snapshot also redirects to the
   API-hosted page. The website page needs aligned routing before it can receive
   these outcomes. See the
   [extension match](../../extension-rewrite/apps/extension/src/manifest.ts#L19),
   [API origin configuration](../../extension-rewrite/apps/extension/src/core/api/api.config.ts#L4),
   [website hosts](../wrangler.jsonc#L7), and
   [checkout redirect snapshot](../../extension-rewrite/apps/extension/scripts/polar/seed-data.json#L232).
2. **The bridge loses useful distinctions.** It writes a status and text into
   `#ext-activation`. It discards the final access reason, embeds
   activation-failure reasons only in text, and merges timeouts with generic
   failures. Detailed designs need structured reasons to survive that boundary.
   See the
   [bridge output](../../extension-rewrite/apps/extension/src/contentScripts/checkout-success/checkout-success.ts#L38).
3. **A saved key makes refresh an unreliable activation retry.** After partial
   setup, refreshing can return `alreadyActivated` without rechecking access.
   The same branch covers active users, expired licenses, unsuccessful previous
   activations, and purchases made while another license is stored. Recovery
   should use Settings' activation controls. See the
   [stored-key guard](../../extension-rewrite/apps/extension/src/background/messaging/runtime-message-handlers.ts#L150)
   and
   [Settings recovery operation](../../extension-rewrite/apps/extension/src/pages/settings/hooks/use-license-activation-step.ts#L420).
4. **Successful activation is not reliably tied to the newly purchased
   license.** The API chooses the customer's first granted license, without
   matching it to the checkout. This affects customers with multiple licenses,
   including the email sign-in recovery path. Avoid purchase-specific activation
   claims until that association exists. See the
   [license selection](../../extension-rewrite/apps/api/src/modules/licensing/endpoints/get-license.endpoint.ts#L60)
   and
   [email sign-in license retrieval](../../extension-rewrite/apps/extension/src/pages/settings/hooks/use-license-activation-step.ts#L289).

Existing tests corroborate successful activation, full seats, unavailable
activation or verification, inactive licenses, missing device activation,
exchange failure, and the stored-key shortcut. Separate handshake tests cover a
background request that never answers. These were inspected as evidence and were
not executed during the review. See the
[background checkout tests](../../extension-rewrite/apps/extension/src/background/messaging/__tests__/runtime-message-handlers.spec.ts#L123)
and
[handshake timeout test](../../extension-rewrite/apps/extension/src/contentScripts/checkout-success/__tests__/checkout-success.spec.ts#L99).
