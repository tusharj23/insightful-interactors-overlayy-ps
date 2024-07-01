
chrome.runtime.onInstalled.addListener(() => {
  console.log("Website Convertor Extension Installed");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'ANALYZE_DATA') {
    analyzeData(message.data).then(response => {
      sendResponse(response);
    });
    return true;
  }
});

async function analyzeData(data) {
  let focus = "general content";  // Placeholder logic for determining focus
  let interest = "engagement";    // Placeholder logic for determining interest

  const N = calculateN(data.interactions);

  const narrative = `Based on the user's interactions, their primary focus seems to be on content that involves ${focus}. This suggests a strong interest in ${interest}.`;

  return { narrative: narrative, N: N };
}

function calculateN(interactions) {
  // Simple placeholder logic for calculating N
  // For example: N can be the count of significant interactions like clicks and scrolls
  let N = interactions.filter(action => action.type === 'click' || action.type === 'scroll').length;
  return N;
}
