
let userActions = [];

function logAction(action) {
  userActions.push(action);
  if (userActions.length % 10 === 0) {
    analyzeUserActions();
  }
}

function analyzeUserActions() {
  chrome.runtime.sendMessage({ type: 'ANALYZE_DATA', data: { interactions: userActions } }, (response) => {
    console.log("Narrative Summary: ", response.narrative);
    console.log("Calculated N: ", response.N);
    displayNarrative(response.narrative);
    updatePopup(response.N, userActions);
  });
}

function displayNarrative(narrative) {
  let narrativeElement = document.getElementById('narrative-summary');
  if (!narrativeElement) {
    narrativeElement = document.createElement('div');
    narrativeElement.id = 'narrative-summary';
    narrativeElement.style.position = 'fixed';
    narrativeElement.style.bottom = '10px';
    narrativeElement.style.right = '10px';
    narrativeElement.style.backgroundColor = 'white';
    narrativeElement.style.border = '1px solid black';
    narrativeElement.style.padding = '10px';
    narrativeElement.style.zIndex = '10000';
    document.body.appendChild(narrativeElement);
  }
  narrativeElement.textContent = narrative;
}

function updatePopup(N, actions) {
  chrome.storage.local.set({ N: N, actions: actions });
}

document.addEventListener('click', (e) => logAction({ type: 'click', x: e.pageX, y: e.pageY, element: e.target.tagName }));
document.addEventListener('mouseover', (e) => logAction({ type: 'hover', x: e.pageX, y: e.pageY, element: e.target.tagName }));
document.addEventListener('keydown', (e) => logAction({ type: 'type', key: e.key, element: e.target.tagName }));
document.addEventListener('scroll', (e) => logAction({ type: 'scroll', scrollTop: document.documentElement.scrollTop }));
