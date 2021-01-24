var openPluginTabBtnEl = document.createElement('input');
openPluginTabBtnEl.setAttribute('type', 'button');
openPluginTabBtnEl.setAttribute('hidden', 'hidden');
openPluginTabBtnEl.setAttribute('id', 'open_chromePlugin_tab');
openPluginTabBtnEl.addEventListener('click', function() {
  chrome.runtime.sendMessage({
    handler: 'open_chrome_tab',
  });
});
document.body.appendChild(openPluginTabBtnEl);

var openPluginActivityBtn = document.createElement('input');
openPluginActivityBtn.setAttribute('type', 'button');
openPluginActivityBtn.setAttribute('hidden', 'hidden');
openPluginActivityBtn.setAttribute('id', 'open_chromePlugin_activity');
openPluginActivityBtn.addEventListener('click', function() {
  chrome.runtime.sendMessage({
    handler: 'open_plugin_activity',
  });
});
document.body.appendChild(openPluginActivityBtn);
