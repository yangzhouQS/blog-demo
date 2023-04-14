(function () {
    function dataset(element, name) {
        return element.dataset ? element.dataset[name] : element.getAttribute("data-" + name);
    }

    var groups = [];
    var itemsMap = {};
    var itemsList = {};

    // 显示版本号
    document.querySelector(".kaka-version").innerHTML = kakaGrid.version;

    // 当前状态
    var _code = "";
    var _group = "";
    var _item = "";

    // 初始化 groups、itemsMap、itemsList
    window.examples.forEach(function (element) {
        var keys = (element.key || "").split("/");
        var group = keys[0] || "";
        var item = keys[1] || "";

        if (groups.indexOf(group) < 0) {
            groups.push(group);
            itemsMap[group] = {};
            itemsList[group] = [];
        }
        itemsMap[group][item] = element;
        itemsList[group].push(item);
    });

    // 构建导航栏 html
    var html = "<ul>";
    groups.forEach(function (group) {
        html += "<li>";
        html += "<div class=\"group-title\" data-group=\"" + group + "\">" + group + "</div>";
        html += "<ul>";
        var items = itemsList[group];
        items.forEach(function (item) {
            html += "<li>";
            html += "<div class=\"item-title\" data-group=\"" + group + "\" data-item=\"" +
                item + "\">" + item + "</div>";
            html += "</li>";
        });
        html += "</ul>";
        html += "</li>";
    });
    html += "</ul>";

    var forEach = function (elements, fn) {
        for (var i = 0; i < elements.length; i++) {
            fn(elements[i]);
        }
    };

    // 初始化导航栏
    var sidebar = document.querySelector(".sidebar");
    sidebar.innerHTML = html;

    // 格式化代码
    var formatCode = function (code) {
        var js = String(code);
        var list = js.split("\n");
        list.shift();
        list.pop();
        list.pop();
        for (var i = 0; i < list.length; i++) {
            var row = list[i];
            list[i] = row.replace("        ", "");
        }
        js = list.join("\n");
        return js;
    };

    // 选择分组
    var selectGroup = function (group) {
        forEach(sidebar.querySelectorAll(".group-title"), function (element) {
            if (dataset(element, "group") === group) {
                element.classList.add("selected");
                element.nextElementSibling.classList.add("expanded");
            } else {
                element.classList.remove("selected");
                element.nextElementSibling.classList.remove("expanded");
            }
        });
    };

    // 选择分组下的节点
    var selectGroupItem = function (group, item) {
        forEach(sidebar.querySelectorAll(".item-title"), function (element) {
            if (dataset(element, "group") === group && dataset(element, "item") === item) {
                element.classList.add("selected");
            } else {
                element.classList.remove("selected");
            }
        });
        if (window.grid) {
            window.grid.dispose();
        }

        window._codeJavascript = formatCode(itemsMap[group][item].grid);
        window._codeStyle = itemsMap[group][item].style;
        window._codeData = formatCode(itemsMap[group][item].data);

        document.querySelector("#example-style").innerHTML = window._codeStyle;
        var startTime = new Date();
        window.grid = itemsMap[group][item].grid();
        var endTime = new Date();
        if (!_code) {
            document.querySelector(".grid-time").textContent = endTime - startTime + "ms";
        }
        // window.grid.theme = window._gridTheme;

        if (!window.editor && window.CodeMirror) {
            window.editor = window.CodeMirror.fromTextArea(document.getElementById("code-text"), {
                lineNumbers: true,
                mode: "javascript",
                theme: "monokai",
                matchBrackets: true,
                readOnly: true,
                value: "",
            });
        }
    };

    // 窗口大小变化事件
    var doResize = function () {
        if (_code && window.editor) {
            var codeElement = document.querySelector(".content-code");
            window.editor.setSize(codeElement.clientWidth, codeElement.clientHeight);
            window.editor.refresh();
        }
    };
    window.addEventListener("resize", doResize);

    // 选择代码
    var selectCode = function (code) {
        var jsElement = document.querySelector(".code-action-javascript");
        var cssElement = document.querySelector(".code-action-style");
        var dataElement = document.querySelector(".code-action-data");
        if (code && window.editor) {
            switch (code) {
                case "javascript":
                    jsElement.classList.add("selected");
                    cssElement.classList.remove("selected");
                    dataElement.classList.remove("selected");
                    window.editor.setOption("mode", "javascript");
                    window.editor.setValue(window._codeJavascript);
                    break;
                case "style":
                    jsElement.classList.remove("selected");
                    cssElement.classList.add("selected");
                    dataElement.classList.remove("selected");
                    window.editor.setOption("mode", "css");
                    window.editor.setValue(window._codeStyle);
                    break;
                case "data":
                    jsElement.classList.remove("selected");
                    cssElement.classList.remove("selected");
                    dataElement.classList.add("selected");
                    window.editor.setOption("mode", "javascript");
                    window.editor.setValue(window._codeData);
                    break;
            }
            document.body.classList.add("code");
            doResize();
        } else {
            jsElement.classList.remove("selected");
            cssElement.classList.remove("selected");
            dataElement.classList.remove("selected");
            document.body.classList.remove("code");
            if (window.grid) {
                window.grid.updateSize();
                window.grid.updateScroll();
                window.grid.invalidate();
            }
        }
    };

    // 浏览历史
    var select = function () {
        if (!itemsMap[_group] || !itemsMap[_group][_item]) {
            _group = groups[0];
            _item = itemsList[_group][0];
        }
        if (_code !== "javascript" && _code !== "style" && _code !== "data") {
            _code = "";
        }
        selectGroup(_group);
        selectGroupItem(_group, _item);
        selectCode(_code);
    };
    var historyPush = select;
    if (window.History && window.History.createHashHistory) {
        var history = window.History.createHashHistory();
        historyPush = function () {
            var url = "/" + _group + "/" + _item;
            if (_code) {
                url += "/" + _code;
            }
            history.push(url);
        };
        var historyHandle = function (location) {
            var paths = location.pathname.split("/");
            _group = paths[1];
            _item = paths[2];
            _code = paths[3];
            select();
        };
        history.listen(historyHandle);
        historyHandle(history.location);
    } else {
        historyPush();
    }

    forEach(sidebar.querySelectorAll(".group-title"), function (element) {
        element.addEventListener("click", function (e) {
            selectGroup(dataset(e.target, "group"));
        });
    });
    forEach(sidebar.querySelectorAll(".item-title"), function (element) {
        element.addEventListener("click", function (e) {
            _group = dataset(e.target, "group");
            _item = dataset(e.target, "item");
            historyPush();
        });
    });

    // 获取元素决定位置
    var getAbsoluteLocation = function (element) {
        var offsetTop = element.offsetTop;
        var offsetLeft = element.offsetLeft;
        var offsetWidth = element.offsetWidth;
        var offsetHeight = element.offsetHeight;
        element = element.offsetParent;
        while (element) {
            offsetTop += element.offsetTop;
            offsetLeft += element.offsetLeft;
            element = element.offsetParent;
        }
        return {
            absoluteTop: offsetTop,
            absoluteLeft: offsetLeft,
            offsetWidth: offsetWidth,
            offsetHeight: offsetHeight
        };
    };

    // 初始化主题选择动作
    window._gridTheme = "";
    document.querySelector(".theme-value").addEventListener("click", function (e) {
        var dropdown = document.querySelector(".theme-dropdown");
        dropdown.classList.add("show");
        var abs = getAbsoluteLocation(e.target);
        dropdown.style.top = abs.absoluteTop + abs.offsetHeight + "px";
        dropdown.style.left = abs.absoluteLeft + (abs.offsetWidth - dropdown.offsetWidth) / 2 + "px";
        e.stopPropagation();
    });
    document.addEventListener("click", function (e) {
        var dropdown = document.querySelector(".theme-dropdown");
        var dropdownItems = document.querySelectorAll(".theme-dropdown-item");
        dropdown.classList.remove("show");
        forEach(dropdownItems, function (el) {
            if (el === e.target) {
                window._gridTheme = dataset(e.target, "id");
                window.grid.theme = window._gridTheme;
                document.querySelector(".theme-value").innerHTML = window._gridTheme;
            }
        });
    });

    // 初始化代码切换动作
    forEach(document.querySelectorAll(".code-action"), function (element) {
        element.addEventListener("click", function (e) {
            var isCode = e.target.classList.toggle("selected");
            if (isCode) {
                _code = dataset(e.target, "id") || "";
            } else {
                _code = "";
            }
            historyPush();
        });
    });
})();