function blockInsecureRequests(requestDetails) {
  if (requestDetails.url.match(/^http:/)) {
    const new_url = requestDetails.url.replace(/^http:/,"https:");
    console.log(`Redirecting ${requestDetails.url} to ${new_url}`);
    return { redirectUrl: new_url };
  } else {
    return;
  }
}

function startEnforcing() {
  chrome.webRequest.onBeforeRequest.addListener(
    blockInsecureRequests,
    {urls: ["<all_urls>"]},
    ["blocking"]
  );
  chrome.browserAction.setIcon({path: "icons/shield-on.png"});
}

function stopEnforcing() {
  chrome.webRequest.onBeforeRequest.removeListener(blockInsecureRequests);
  chrome.browserAction.setIcon({path: "icons/shield-off.png"});
}

function toggleHttpsOnly() {
  if (chrome.webRequest.onBeforeRequest.hasListener(blockInsecureRequests)) {
    stopEnforcing();
  } else {
    startEnforcing();
  }
}

chrome.browserAction.onClicked.addListener(toggleHttpsOnly);

startEnforcing();
