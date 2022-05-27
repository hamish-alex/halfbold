browser.contextMenus.create({
    id: "half-bold",
    title: "HalfBold this page"
  });
  
  browser.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "half-bold") {
      browser.tabs.executeScript({
        file: "bolding.js"
      });
    }
  });