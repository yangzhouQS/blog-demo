/* eslint-disable */
// This file contains the definition of the completers used for the Vomnibox's suggestion UI. A completer will
// take a query (whatever the user typed into the Vomnibox) and return a list of Suggestions, e.g. bookmarks,
// domains, URLs from history.
//
// The Vomnibox frontend script makes a "filterCompleter" request to the background page, which in turn calls
// filter() on each these completers.
//
// A completer is a class which has three functions:
//  - filter(query, onComplete): "query" will be whatever the user typed into the Vomnibox.
//  - refresh(): (optional) refreshes the completer's data source (e.g. refetches the list of bookmarks).
//  - cancel(): (optional) cancels any pending, cancelable action.

const showRelevancy = false; // Set this to true to render relevancy when debugging the ranking scores.

class Suggestion {
  constructor(options) {
    // Required options.
    this.options = options;
    this.queryTerms = null;
    this.type = null;
    this.url = null;
    this.relevancyFunction = null;
    this.description = null;
    // Other options.
    this.title = '';
    // 相关性函数所用数据
    // Extra data which will be available to the relevancy function.
    this.relevancyData = null;
    // 是否自动选择第0条
    // If @autoSelect is truthy, then this suggestion is automatically pre-selected in the vomnibar.  This only
    // affects the suggestion in slot 0 in the vomnibar.
    this.autoSelect = false;
    // If @highlightTerms is true, then we highlight matched terms in the title and URL.  Otherwise we don't.
    this.highlightTerms = true;
    // @insertText is text to insert into the vomnibar input when the suggestion is selected.
    this.insertText = null;
    // suggestion是否考虑去重
    // @deDuplicate controls whether this suggestion is a candidate for deduplication.
    this.deDuplicate = true;

    // Other options set by individual completers include:
    // - tabId (TabCompleter)
    // - isSearchSuggestion, customSearchMode (SearchEngineCompleter)
    Object.assign(this, this.options);
  }

  // 返回关联得分
  // Returns the relevancy score.
  computeRelevancy() {
    // 一旦设定不可更改，Completers必须设置 @relevancy or @relevancyFunction.
    // We assume that, once the relevancy has been set, it won't change.  Completers must set either @relevancy or @relevancyFunction.
    if (this.relevancy == null) {
      this.relevancy = this.relevancyFunction(this);
    }
    return this.relevancy;
  }
  generateHtml(request) {
    if (this.html) {
      return this.html;
    }
    const relevancyHtml = showRelevancy ? `<span class='relevancy'>${this.computeRelevancy()}</span>` : '';
    // const insertTextClass = this.insertText ? 'vomnibarInsertText' : 'vomnibarNoInsertText';
    // const insertTextIndicator = '&#8618;'; // A right hooked arrow.
    if (this.insertText && request.isCustomSearch) {
      this.title = this.insertText;
    }
    // NOTE(philc): We're using these vimium-specific class names so we don't collide with the page's CSS.
    let favIcon = '';
    if (this.type === 'tab' && !Utils.isFirefox()) {
      favIcon = `<img class="vimiumReset vomnibarIcon" src="chrome://favicon/size/16@1x/${BgUtils.escapeAttribute(this.url)}" />`;
    }
    if (this.type === 'csdn') {
      favIcon = `<img class="vimiumReset vomnibarIcon" style="width: 17px;" src="/icons/icon-128.png" />`;
    }
    const TYPE_MAP = {
      bookmark: '书签',
      history: '历史记录',
      domain: '域名',
      tab: '标签页',
      csdn: 'CSDN',
      doc: '文档',
    };
    if (this.type === 'csdn') {
      this.html = `\
          <div class="vimiumReset vomnibarTopHalf">
            <img class="type-icon" src="./icons/type-${this.type}.svg" alt="">
       <!-- <span class="vimiumReset vomnibarSource vomnibarSource-csdn" style="font-weight:600;">${TYPE_MAP[this.type]}</span> -->
            <span class="vimiumReset vomnibarTitle">${this.title2}</span>
          </div>
          <div class="vimiumReset vomnibarBottomHalf vomnibarBottomHalf-csdn">
            <span class="vimiumReset vomnibarUrl">${this.description}</span>
          </div>\
        `;
    } else if (this.type === 'frame') {
      this.html = `<div id="${this.info.id}"></div>`;
    } else if (this.type === 'doc') {
      this.html = `<div class="vimiumReset vomnibarTopHalf">
                    <img class="type-icon" src="./icons/type-${this.type}.svg" alt="">
                 <!--   <span class="vimiumReset vomnibarSource vomnibarSource-csdn" style="font-weight:600;">${TYPE_MAP[this.type]}</span> -->
                    <span class="vimiumReset vomnibarTitle">${this.title}</span>
                    </div>`;
    } else if (this.type === 'utils') {
      // json qrcode help
      if (this.template) {
        this.html = this.template;
      } else {
        const extendTypeMap = { calc: '计算结果', date: '日期' };
        this.html = `<div class="vimiumReset vomnibarTopHalf">
                        <img class="type-icon" src="./icons/type-${this.extendType}.svg" alt="">
                        <span class="vimiumReset vomnibarTitle">
                          <span class="${this.extendType === 'date' ? 'time-copy' : ''}">
                            ${
                              this.extendType === 'date'
                                ? this.description.time
                                : `${this.description.split('=')[0]} = <span class="time-copy">${this.description.split('=')[1]}</span>`
                            }
                          </span>
                           ${typeof this.description.timeStamp === 'number' ? `时间戳: <span class="time-copy">${this.description.timeStamp}</span>` : ''}
                        </span>
                      </div>`;
        if (this.extendType === 'date') {
          this.html += `<div class="vimiumReset vomnibarTopHalf" style="margin-top: 5px;">
                          <span class="vimiumReset vomnibarTitle">
                          当前时间: <span class="time-copy">${this.description.currentTime}</span>
                          时间戳：<span class="time-copy">${this.description.currentTimeStamp}</span>
                          </span>
                        </div>
                        <div class="copy-input" hidden></div>
                        `;
        }
        this.html += `<img class="copy-btn" copy-data="${
          this.extendType === 'date' ? this.description.timeStamp || this.description.time : this.description.split('=')[1]
        }" src="/images/copy.svg" alt="">`;
      }
    } else if (request.isCustomSearch) {
      this.html = `\
                    <div class="vimiumReset vomnibarTopHalf">
                      <span class="vimiumReset vomnibarSource">${TYPE_MAP[this.type] || this.type}</span>
                      <span class="vimiumReset vomnibarTitle">${this.highlightQueryTerms(Utils.escapeHtml(this.title))}</span>
                      ${relevancyHtml}
                    </div>\
                  `;
    } else {
      this.html = `\
          <div class="vimiumReset vomnibarTopHalf">
            <img class="type-icon" src="./icons/type-${this.type}.svg" alt="">
      <!--  <span class="vimiumReset vomnibarSource vomnibarSource-${this.type}">${TYPE_MAP[this.type]}</span>  -->
            <span class="vimiumReset vomnibarTitle">${this.highlightQueryTerms(Utils.escapeHtml(this.title))}</span>
          </div>
          <div class="vimiumReset vomnibarBottomHalf">
            ${favIcon}<span class="vimiumReset vomnibarUrl">${this.highlightUrlTerms(Utils.escapeHtml(this.shortenUrl()))}</span>${relevancyHtml}
          </div>\
        `;
    }
    return this.html;
  }

  // Use neat trick to snatch a domain (http://stackoverflow.com/a/8498668).
  getUrlRoot(url) {
    const a = document.createElement('a');
    a.href = url;
    return a.protocol + '//' + a.hostname;
  }

  getHostname(url) {
    const a = document.createElement('a');
    a.href = url;
    return a.hostname;
  }

  stripTrailingSlash(url) {
    if (url[url.length - 1] === '/') {
      url = url.substring(url, url.length - 1);
    }
    return url;
  }

  // Push the ranges within `string` which match `term` onto `ranges`.
  pushMatchingRanges(string, term, ranges) {
    let textPosition = 0;
    // Split `string` into a (flat) list of pairs:
    //   - for i=0,2,4,6,...
    //     - splits[i] is unmatched text
    //     - splits[i+1] is the following matched text (matching `term`)
    //       (except for the final element, for which there is no following matched text).
    // Example:
    //   - string = "Abacab"
    //   - term = "a"
    //   - splits = [ "", "A",    "b", "a",    "c", "a",    b" ]
    //                UM   M       UM   M       UM   M      UM      (M=Matched, UM=Unmatched)
    let splits = [];
    try {
      splits = string.split(RegexpCache.get(term, '(', ')'));
    } catch (e) {
      return;
    }
    for (let index = 0, end = splits.length - 2; index <= end; index += 2) {
      const unmatchedText = splits[index];
      const matchedText = splits[index + 1];
      // Add the indices spanning `matchedText` to `ranges`.
      textPosition += unmatchedText.length;
      ranges.push([textPosition, textPosition + matchedText.length]);
      textPosition += matchedText.length;
    }
  }

  // Wraps each occurence of the query terms in the given string in a <span>.
  highlightQueryTerms(string) {
    if (!this.highlightTerms) {
      return string;
    }
    let ranges = [];
    const escapedTerms = this.queryTerms.map(term => Utils.escapeHtml(term));
    for (let term of escapedTerms) {
      this.pushMatchingRanges(string, term, ranges);
    }
    if (ranges.length === 0) {
      return string;
    }

    ranges = this.mergeRanges(ranges.sort((a, b) => a[0] - b[0]));
    // Replace portions of the string from right to left.
    ranges = ranges.sort((a, b) => b[0] - a[0]);
    for (let [start, end] of ranges) {
      string = string.substring(0, start) + `<span class='vomnibarMatch'>${string.substring(start, end)}</span>` + string.substring(end);
    }
    return string;
  }

  highlightUrlTerms(string) {
    if (this.highlightTermsExcludeUrl) {
      return string;
    } else {
      return this.highlightQueryTerms(string);
    }
  }

  // Merges the given list of ranges such that any overlapping regions are combined. E.g.
  //   mergeRanges([0, 4], [3, 6]) => [0, 6].  A range is [startIndex, endIndex].
  mergeRanges(ranges) {
    let previous = ranges.shift();
    const mergedRanges = [previous];
    ranges.forEach(function(range) {
      if (previous[1] >= range[0]) {
        previous[1] = Math.max(range[1], previous[1]);
      } else {
        mergedRanges.push(range);
        previous = range;
      }
    });
    return mergedRanges;
  }

  // Simplify a suggestion's URL (by removing those parts which aren't useful for display or comparison).
  shortenUrl() {
    if (this.shortUrl != null) {
      return this.shortUrl;
    }
    // We get easier-to-read shortened URLs if we URI-decode them.
    let url = (Utils.decodeURIByParts(this.url) || this.url).toLowerCase();
    for (let [filter, replacements] of Suggestion.stripPatterns) {
      if (new RegExp(filter).test(url)) {
        for (let replace of replacements) {
          url = url.replace(replace, '');
        }
      }
    }

    this.shortUrl = url;
    return this.shortUrl;
  }

  // Boost a relevancy score by a factor (in the range (0,1.0)), while keeping the score in the range [0,1].
  // This makes greater adjustments to scores near the middle of the range (so, very poor relevancy scores
  // remain very poor).
  static boostRelevancyScore(factor, score) {
    return score + (score < 0.5 ? score * factor : (1.0 - score) * factor);
  }
}

// Patterns to strip from URLs; of the form [ [ filter, replacements ], [ filter, replacements ], ... ]
//   - filter is a regexp string; a URL must match this regexp first.
//   - replacements (itself a list) is a list of regexp objects, each of which is removed from URLs matching
//     the filter.
//
// Note. This includes site-specific patterns for very-popular sites with URLs which don't work well in the
// vomnibar.
//
Suggestion.stripPatterns = [
  // Google search specific replacements; this replaces query parameters which are known to not be helpful.
  // There's some additional information here: http://www.teknoids.net/content/google-search-parameters-2012
  [
    '^https?://www\\.google\\.(com|ca|com\\.au|co\\.uk|ie)/.*[&?]q=',
    'ei gws_rd url ved usg sa usg sig2 bih biw cd aqs ie sourceid es_sm'.split(/\s+/).map(param => new RegExp(`\&${param}=[^&]+`)),
  ],

  // On Google maps, we get a new history entry for every pan and zoom event.
  ['^https?://www\\.google\\.(com|ca|com\\.au|co\\.uk|ie)/maps/place/.*/@', [new RegExp('/@.*')]],

  // General replacements; replaces leading and trailing fluff.
  ['.', ['^https?://', '\\W+$'].map(re => new RegExp(re))],
];

const folderSeparator = '/';

// If these names occur as top-level bookmark names, then they are not included in the names of bookmark folders.
const ignoredTopLevelBookmarks = {
  'Other Bookmarks': true,
  'Mobile Bookmarks': true,
  'Bookmarks Bar': true,
};

// this.bookmarks are loaded asynchronously when refresh() is called.
class BookmarkCompleter {
  filter({ queryTerms, query }, onComplete) {
    const excludeKeys = BgUtils.getExcludeKeys();

    if (queryTerms.length && excludeKeys.indexOf(query.split(/\s+/)[0]) > -1) {
      return onComplete([]);
    }
    this.queryTerms = queryTerms;
    this.onComplete = onComplete;
    this.currentSearch = { queryTerms: this.queryTerms, onComplete: this.onComplete };
    if (this.bookmarks) {
      return this.performSearch();
    }
  }

  onBookmarksLoaded() {
    if (this.currentSearch) {
      this.performSearch();
    }
  }

  performSearch() {
    // If the folder separator character the first character in any query term, then we'll use the bookmark's
    // full path as its title. Otherwise, we'll just use the its regular title.
    let results;
    const usePathAndTitle = this.currentSearch.queryTerms.reduce((prev, term) => prev || term.startsWith(folderSeparator), false);
    if (this.currentSearch.queryTerms.length > 0) {
      results = this.bookmarks.filter(bookmark => {
        const suggestionTitle = usePathAndTitle ? bookmark.pathAndTitle : bookmark.title;
        if (bookmark.hasJavascriptPrefix == null) {
          bookmark.hasJavascriptPrefix = Utils.hasJavascriptPrefix(bookmark.url);
        }
        if (bookmark.hasJavascriptPrefix && bookmark.shortUrl == null) {
          bookmark.shortUrl = 'javascript:...';
        }
        const suggestionUrl = bookmark.shortUrl != null ? bookmark.shortUrl : bookmark.url;
        return RankingUtils.matches(this.currentSearch.queryTerms, suggestionUrl, suggestionTitle);
      });
    } else {
      results = [];
    }
    const suggestions = results.map((bookmark, index) => {
      return new Suggestion({
        queryTerms: this.currentSearch.queryTerms,
        type: 'bookmark',
        url: bookmark.url,
        title: usePathAndTitle ? bookmark.pathAndTitle : bookmark.title,
        relevancy: index < 2 ? 1.08 : null,
        relevancyFunction: this.computeRelevancy,
        shortUrl: bookmark.shortUrl,
        deDuplicate: bookmark.shortUrl == null,
      });
    });
    const onComplete = this.currentSearch.onComplete;
    this.currentSearch = null;
    onComplete(suggestions);
  }

  refresh() {
    this.bookmarks = null;
    chrome.bookmarks.getTree(bookmarks => {
      this.bookmarks = this.traverseBookmarks(bookmarks).filter(bookmark => bookmark.url != null);
      this.onBookmarksLoaded();
    });
  }

  // Traverses the bookmark hierarchy, and returns a flattened list of all bookmarks.
  traverseBookmarks(bookmarks) {
    const results = [];
    bookmarks.forEach(folder => this.traverseBookmarksRecursive(folder, results));
    return results;
  }

  // Recursive helper for `traverseBookmarks`.
  traverseBookmarksRecursive(bookmark, results, parent) {
    if (parent == null) {
      parent = { pathAndTitle: '' };
    }
    if (bookmark.title && !(parent.pathAndTitle === '' && ignoredTopLevelBookmarks[bookmark.title])) {
      bookmark.pathAndTitle = parent.pathAndTitle + folderSeparator + bookmark.title;
    } else {
      bookmark.pathAndTitle = parent.pathAndTitle;
    }
    results.push(bookmark);
    if (bookmark.children) {
      bookmark.children.forEach(child => this.traverseBookmarksRecursive(child, results, bookmark));
    }
  }

  computeRelevancy(suggestion) {
    return RankingUtils.wordRelevancy(suggestion.queryTerms, suggestion.shortUrl || suggestion.url, suggestion.title);
  }
}

// calc date json qrcode
class UtilsCompleter {
  filter({ queryTerms }, onComplete) {
    if (queryTerms.length) {
      let presupposition = Settings.get('presupposition');
      presupposition = BgUtils.parseLines(presupposition);
      const queryType = BgUtils.parseKeyValue(presupposition);
      const queryFirst = queryTerms[0];

      const isEndalbeOfCalculator = Object.values(queryType).includes('calc');
      const allowEditUtilsMap = {
        json: this.jsonCompleter,
        qrcode: this.qrCodeCompleter,
        date: this.dateCompleter,
        doc: this.docCompleter,
        calc: this.calcCompleter,
      };
      const notAllowEditUtilsMap = {
        help: this.helpCompleter,
        version: this.versionCompleter,
      };
      try {
        if (queryType[queryFirst]) {
          allowEditUtilsMap[queryType[queryFirst]](queryTerms, onComplete);
        } else if (notAllowEditUtilsMap[queryFirst]) {
          notAllowEditUtilsMap[queryFirst](queryTerms, onComplete);
        } else if (isEndalbeOfCalculator) {
          this.calcCompleter(queryTerms, onComplete);
        }
      } catch (e) {
        onComplete([]);
      }
      onComplete([]);
    } else {
      onComplete([]);
    }
  }

  versionCompleter(queryTerms, onComplete) {
    onComplete([
      new Suggestion({
        queryTerms,
        type: 'utils',
        extendType: 'version',
        template: `<div class="vimiumReset vimium-qrcode">当前版本: ${Utils.getCurrentVersion()}</div>`,
        url: 'javascript:;',
        description: ``,
        title: '',
        highlightTerms: false,
        highlightTermsExcludeUrl: false,
        isCustomSearch: true,
        // 将前三个设置为最高权重, 仅次于Domain
        relevancy: 3,
        relevancyFunction: this.computeRelevancy,
      }),
    ]);
  }

  helpCompleter(queryTerms, onComplete) {
    onComplete([
      new Suggestion({
        queryTerms,
        type: 'utils',
        extendType: 'help',
        template: Settings.helpHTML,
        url: 'javascript:;',
        description: ``,
        title: '',
        highlightTerms: false,
        highlightTermsExcludeUrl: false,
        isCustomSearch: true,
        // 将前三个设置为最高权重, 仅次于Domain
        relevancy: 3,
        relevancyFunction: this.computeRelevancy,
      }),
    ]);
  }

  calcCompleter(queryTerms, onComplete) {
    var that = this;
    try {
      let calcStr = queryTerms[0] === 'calc' ? queryTerms.slice(1).join('') : queryTerms.join('');
      let calcRes = eval(calcStr);
      // 是数字 && 不等于自身
      if (typeof calcRes === 'number' && calcRes.toString() !== calcStr) {
        if (calcRes.toString().indexOf('.') > -1 && calcRes.toString().split('.')[1].length > 2) {
          calcRes = calcRes.toFixed(2);
        }
        onComplete([
          new Suggestion({
            queryTerms,
            type: 'utils',
            extendType: 'calc',
            url: 'javascript:;1',
            description: `${calcStr} = ${calcRes}`,
            title: '',
            highlightTerms: false,
            highlightTermsExcludeUrl: false,
            isCustomSearch: true,
            // 将前三个设置为最高权重, 仅次于Domain
            relevancy: 3,
            relevancyFunction: that.computeRelevancy,
          }),
        ]);
      } else {
        onComplete([]);
      }
    } catch (e) {
      onComplete([]);
    }
  }

  dateCompleter(queryTerms, onComplete) {
    var that = this;
    // 日期
    let datestr = queryTerms.slice(1).join(' ');
    if (datestr.length <= 17 && !isNaN(Number(datestr))) {
      datestr = Number(datestr);
    }
    try {
      let dateObj = new Date(datestr);
      if (dayjs(datestr).isValid() && dateObj.toString() !== 'Invalid Date') {
        let dayjsObj = dayjs(datestr);
        onComplete([
          new Suggestion({
            queryTerms,
            url: 'javascript:;2',
            type: 'utils',
            extendType: 'date',
            description: {
              time: dayjsObj.format('YYYY-MM-DD HH:mm:ss'),
              timeStamp: dayjsObj.valueOf(),
              currentTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
              currentTimeStamp: +new Date(),
            },
            title: queryTerms.join(''),
            highlightTerms: false,
            highlightTermsExcludeUrl: false,
            isCustomSearch: true,
            // 将前三个设置为最高权重, 仅次于Domain
            relevancy: 3,
            relevancyFunction: that.computeRelevancy,
          }),
        ]);
      }
    } catch (e) {
      onComplete([]);
    }
  }

  qrCodeCompleter(queryTerms, onComplete) {
    var that = this;
    onComplete([
      new Suggestion({
        queryTerms,
        url: 'javascript:;',
        type: 'utils',
        extendType: 'qrcode',
        // <p>${queryTerms.length === 1 ? location.href : ''}</p>
        template: `<div class="vimiumReset vimium-qrcode">
                    <canvas id="qrcode-panel"></canvas>
                    <p id="qrcode-panel-txt"></p>
                  </div>`,
        description: `二维码`,
        title: `二维码`,
        highlightTerms: false,
        highlightTermsExcludeUrl: false,
        isCustomSearch: true,
        relevancy: 3,
        relevancyFunction: that.computeRelevancy,
      }),
    ]);
  }

  jsonCompleter(queryTerms, onComplete) {
    var that = this;
    onComplete([
      new Suggestion({
        queryTerms,
        url: 'javascript:;',
        // url: chrome.runtime.getURL("packages/json-format/index.html"),
        type: 'utils',
        extendType: 'json',
        template: `<div class="vimiumReset vimium-json">
                    <div class="json-result-panel" id="json-format"></div>
                  </div>`,
        description: `JSON格式化工具`,
        title: `JSON格式化工具`,
        highlightTerms: false,
        highlightTermsExcludeUrl: false,
        isCustomSearch: true,
        // 将前三个设置为最高权重, 仅次于Domain
        relevancy: 3,
        relevancyFunction: that.computeRelevancy,
      }),
    ]);
  }

  docCompleter(queryTerms, onComplete) {
    let result = [];
    let queryword = queryTerms.slice(1).join(' ');
    for (let key in Settings.frameConfigs.doc) {
      if (key === queryword) {
        result.push(
          new Suggestion({
            queryTerms,
            url: Settings.frameConfigs.doc[key].split('?')[0],
            type: 'frame',
            info: {
              id: 'frame-doc-view',
              url: Settings.frameConfigs.doc[key],
              height: '70vh',
              placeholder: '正在打开文档...',
            },
            autoSelect: true,
            description: `文档`,
            title: `${key}文档`,
            isCustomSearch: true,
            highlightTerms: false,
            highlightTermsExcludeUrl: false,
            relevancy: 3,
          })
        );
      } else if (key.indexOf(queryword) > -1) {
        result.push(
          new Suggestion({
            queryTerms: [],
            url: Settings.frameConfigs.doc[key].split('?')[0],
            type: 'doc',
            description: `文档：${key}`,
            // insertText: key,
            title: key,
            highlightTerms: false,
            highlightTermsExcludeUrl: false,
            isCustomSearch: true,
            relevancy: 3,
          })
        );
      }
    }
    onComplete(result);
  }

  // preprocessRequest (request) {
  //   // SearchEngines.use(engines => {
  //     const { queryTerms, query } = request;
  //     // Object.assign(request, {searchEngines: engines, keywords: Object.keys(engines)});
  //     const keyword = queryTerms[0];
  //     // Note. For a keyword "w", we match "w search terms" and "w ", but not "w" on its own.
  //     if (keyword && keyword === 'gg' && ((queryTerms.length > 1) || /\S\s/.test(query))) {
  //       Object.assign(request, {
  //         queryTerms: queryTerms.slice(1),
  //         keyword,
  //         // engine: engines[keyword],
  //         isCustomSearch: true
  //       });
  //     }
  //   // });
  // }

  computeRelevancy(suggestion) {
    return RankingUtils.wordRelevancy(suggestion.queryTerms, suggestion.url_location || suggestion.url, suggestion.title);
  }
}

class FrameCompleter {
  filter({ queryTerms, query }, onComplete) {
    var that = this;
    // 如果不是Ary 或者是空Ary
    if (!Array.isArray(queryTerms) || queryTerms.length === 0) {
      onComplete([]);
    } else {
      let result = [];
      const firstQuery = queryTerms[0];
      const iframeMap = Settings.get('iframeMap');
      const webPagesMap = Settings.get('webPagesMap');
      const webIframe = webPagesMap.filter(i => i.enable).find(i => i.triggerWord === firstQuery);

      try {
        if (iframeMap.hasOwnProperty(firstQuery) && iframeMap[firstQuery].enable) {
          let info = JSON.parse(JSON.stringify(iframeMap[firstQuery]));
          let defaultEnableKey = Object.keys(iframeMap)
            .map(v => (iframeMap[v].defaultEnable ? v : ''))
            .filter(v => v);
          if (defaultEnableKey.indexOf(firstQuery) === -1 && queryTerms.length === 1) {
            onComplete([]);
            return;
          }
          let queryword = queryTerms.length > 1 ? queryTerms.slice(1).join(' ') : '';

          let suggestionFlag = true;
          if (defaultEnableKey.indexOf(firstQuery) > -1) {
            switch (firstQuery) {
              case 'ip':
                suggestionFlag = !queryword || Utils.checkIP(queryword);
                break;
            }
          } else {
            suggestionFlag = !!queryword;
          }
          if (suggestionFlag) {
            let url = info.url.replace('%s', queryword);
            url = url.indexOf('?') > -1 ? `${url}&__mode__=frame` : `${url}?__mode__=frame`;
            info = Object.assign(info, {
              id: `frame-${(+new Date() + '').slice(5, -1)}`,
              height: info.height || '70vh',
              query: query,
              url: url,
            });

            if (queryTerms.length === 1 && query.indexOf(' ') > -1) {
              result = [];
            } else {
              result.push(
                new Suggestion({
                  queryTerms,
                  url: 'javascript:;',
                  type: 'frame',
                  info: info,
                  autoSelect: true,
                  description: `iframe工具`,
                  title: `iframe工具`,
                  highlightTerms: false,
                  highlightTermsExcludeUrl: false,
                  isCustomSearch: true,
                  relevancy: 3,
                  relevancyFunction: that.computeRelevancy,
                })
              );
            }
          }
        } else if (webIframe) {
          result.push(
            new Suggestion({
              queryTerms,
              url: 'javascript:;',
              type: 'frame',
              info: Object.assign(webIframe, {
                id: `frame-${(+new Date() + '').slice(5, -1)}`,
                height: webIframe.height || '70vh',
                query: query,
                url: webIframe.url,
              }),
              autoSelect: true,
              description: `iframe工具`,
              title: `iframe工具`,
              highlightTerms: false,
              highlightTermsExcludeUrl: false,
              isCustomSearch: true,
              relevancy: 10,
              relevancyFunction: that.computeRelevancy,
            })
          );
        }
      } catch (e) {
        console.log('FrameCompleter Error', e);
      }
      onComplete(result);
    }
  }

  computeRelevancy(suggestion) {
    return RankingUtils.wordRelevancy(suggestion.queryTerms, suggestion.url_location || suggestion.url, suggestion.title);
  }
}

class CSDNCompleter {
  filter(data, onComplete) {
    const { queryTerms, query } = data;

    const excludeKeys = BgUtils.getExcludeKeys();
    if (queryTerms.length === 0 || (queryTerms.length && excludeKeys.indexOf(query.split(/\s+/)[0]) > -1)) {
      this.csdn = [];
      onComplete([]);
    } else {
      const filter = suggestions => {
        return suggestions;
      };
      onComplete([], {
        filter,
        continuation: onComplete => {
          $.get('https://so.csdn.net/api/v1/search?platform=pc&s=5&from=chrome_plugin&q=' + encodeURIComponent(queryTerms.join(' ')), res => {
            if (res.result_vos && res.result_vos.length) {
              let results = res.result_vos;
              this.csdn = results.splice(0, 10);
              try {
                onComplete(
                  this.csdn.map((entry, index) => {
                    return new Suggestion({
                      queryTerms,
                      type: 'csdn',
                      url: entry.url.indexOf('?') > -1 ? `${entry.url}&from=chrome_plugin` : `${entry.url}?from=chrome_plugin`,
                      description: entry.digest || '',
                      title: entry.title,
                      title2: entry.title,
                      highlightTerms: true,
                      highlightTermsExcludeUrl: true,
                      isCustomSearch: true,
                      relevancy: index < 3 ? 1.04 : 0.1,
                      relevancyFunction: this.computeRelevancy,
                    });
                  })
                );
              } catch (e) {
                onComplete([]);
              }
            } else {
              onComplete([]);
            }
          });
        },
      });
    }
  }
  computeRelevancy(suggestion) {
    return RankingUtils.wordRelevancy(suggestion.queryTerms, suggestion.url_location || suggestion.url, suggestion.title);
  }
}
class HistoryCompleter {
  filter({ queryTerms, seenTabToOpenCompletionList, query }, onComplete) {
    const excludeKeys = BgUtils.getExcludeKeys();

    if ((queryTerms.length === 0 && !seenTabToOpenCompletionList) || (queryTerms.length && excludeKeys.indexOf(query.split(/\s+/)[0]) > -1)) {
      onComplete([]);
      // Prime the history cache so that it will (hopefully) be available on the user's next keystroke.
      Utils.nextTick(() => HistoryCache.use(function() {}));
    } else {
      HistoryCache.use(history => {
        let results;
        if (queryTerms.length > 0) {
          results = history.filter(entry => RankingUtils.matches(queryTerms, entry.url, entry.title));
        } else {
          // The user has typed <Tab> to open the entire history (sorted by recency).
          results = history;
        }
        onComplete(
          results.map((entry, index) => {
            return new Suggestion({
              queryTerms,
              type: 'history',
              url: entry.url,
              title: entry.title,
              relevancyFunction: this.computeRelevancy,
              // relevancy: index < 2 ? 1.03 : null,
              relevancyData: entry,
            });
          })
        );
      });
    }
  }

  computeRelevancy(suggestion) {
    const historyEntry = suggestion.relevancyData;
    const recencyScore = RankingUtils.recencyScore(historyEntry.lastVisitTime);
    // If there are no query terms, then relevancy is based on recency alone.
    if (suggestion.queryTerms.length === 0) {
      return recencyScore;
    }
    const wordRelevancy = RankingUtils.wordRelevancy(suggestion.queryTerms, suggestion.url, suggestion.title);
    // Average out the word score and the recency. Recency has the ability to pull the score up, but not down.
    return (wordRelevancy + Math.max(recencyScore, wordRelevancy)) / 2;
  }
}
// The domain completer is designed to match a single-word query which looks like it is a domain. This supports
// the user experience where they quickly type a partial domain, hit tab -> enter, and expect to arrive there.
class DomainCompleter {
  constructor() {
    // A map of domain -> { entry: <historyEntry>, referenceCount: <count> }
    // - `entry` is the most recently accessed page in the History within this domain.
    // - `referenceCount` is a count of the number of History entries within this domain.
    //    If `referenceCount` goes to zero, the domain entry can and should be deleted.
    this.domains = null;
  }

  filter({ queryTerms, query }, onComplete) {
    // Do not offer completions if the query is empty, or if the user has finished typing the first word.
    if (queryTerms.length === 0 || /\S\s/.test(query)) {
      return onComplete([]);
    }
    if (this.domains) {
      this.performSearch(queryTerms, onComplete);
    } else {
      this.populateDomains(() => this.performSearch(queryTerms, onComplete));
    }
  }

  performSearch(queryTerms, onComplete) {
    const query = queryTerms[0];
    let domains = Object.keys(this.domains || []).filter(d => d.includes(query));
    domains = this.sortDomainsByRelevancy(queryTerms, domains);
    onComplete(
      [
        new Suggestion({
          queryTerms,
          type: 'domain',
          url: (domains[0] != null ? domains[0][0] : undefined) != null ? (domains[0] != null ? domains[0][0] : undefined) : '', // This is the URL or an empty string, but not null.
          relevancy: 2.0,
        }),
      ].filter(s => s.url.length > 0)
    );
  }

  // Returns a list of domains of the form: [ [domain, relevancy], ... ]
  sortDomainsByRelevancy(queryTerms, domainCandidates) {
    const results = [];
    for (let domain of domainCandidates) {
      const recencyScore = RankingUtils.recencyScore(this.domains[domain].entry.lastVisitTime || 0);
      const wordRelevancy = RankingUtils.wordRelevancy(queryTerms, domain, null);
      const score = (wordRelevancy + Math.max(recencyScore, wordRelevancy)) / 2;
      results.push([domain, score]);
    }
    results.sort((a, b) => b[1] - a[1]);
    return results;
  }

  populateDomains(onComplete) {
    HistoryCache.use(history => {
      this.domains = {};
      history.forEach(entry => this.onPageVisited(entry));
      chrome.history.onVisited.addListener(this.onPageVisited.bind(this));
      chrome.history.onVisitRemoved.addListener(this.onVisitRemoved.bind(this));
      onComplete();
    });
  }

  onPageVisited(newPage) {
    const domain = this.parseDomainAndScheme(newPage.url);
    if (domain) {
      const slot = this.domains[domain] || (this.domains[domain] = { entry: newPage, referenceCount: 0 });
      // We want each entry in our domains hash to point to the most recent History entry for that domain.
      if (slot.entry.lastVisitTime < newPage.lastVisitTime) {
        slot.entry = newPage;
      }
      slot.referenceCount += 1;
    }
  }

  onVisitRemoved(toRemove) {
    if (toRemove.allHistory) {
      this.domains = {};
    } else {
      toRemove.urls.forEach(url => {
        const domain = this.parseDomainAndScheme(url);
        if (domain && this.domains[domain] && (this.domains[domain].referenceCount -= 1) === 0) {
          return delete this.domains[domain];
        }
      });
    }
  }

  // Return something like "http://www.example.com" or false.
  parseDomainAndScheme(url) {
    return Utils.hasFullUrlPrefix(url) && !Utils.hasChromePrefix(url) && url.split('/', 3).join('/');
  }
}

// Searches through all open tabs, matching on title and URL.
class TabCompleter {
  filter({ name, queryTerms, query }, onComplete) {
    if (name !== 'tabs' && queryTerms.length === 0) {
      return onComplete([]);
    }
    const excludeKeys = BgUtils.getExcludeKeys();

    if (queryTerms.length && excludeKeys.indexOf(query.split(/\s+/)[0]) > -1) {
      return onComplete([]);
    }
    // NOTE(philc): We search all tabs, not just those in the current window. I'm not sure if this is the
    // correct UX.
    chrome.tabs.query({}, tabs => {
      const results = tabs.filter(tab => RankingUtils.matches(queryTerms, tab.url, tab.title));
      const suggestions = results
        .map((tab, index) => {
          const suggestion = new Suggestion({
            queryTerms,
            type: 'tab',
            url: tab.url,
            title: tab.title,
            tabId: tab.id,
            deDuplicate: false,
          });
          suggestion.relevancy = index < 2 ? 1 : index >= 2 && index < 5 ? 0.1 : this.computeRelevancy(suggestion);
          return suggestion;
        })
        .sort((a, b) => b.relevancy - a.relevancy);
      // Boost relevancy with a multiplier so a relevant tab doesn't
      // get crowded out by results from competing completers. To
      // prevent tabs from crowding out everything else in turn,
      // penalize them for being further down the results list by
      // scaling on a hyperbola starting at 1 and approaching 0
      // asymptotically for higher indexes. The multiplier and the
      // curve fall-off were objectively chosen on the grounds that
      // they seem to work pretty well.
      suggestions.forEach(function(suggestion, i) {
        suggestion.relevancy *= 8;
        return (suggestion.relevancy /= i / 4 + 1);
      });
      onComplete(suggestions);
    });
  }

  computeRelevancy(suggestion) {
    if (suggestion.queryTerms.length) {
      return RankingUtils.wordRelevancy(suggestion.queryTerms, suggestion.url, suggestion.title);
    } else {
      return BgUtils.tabRecency.recencyScore(suggestion.tabId);
    }
  }
}

class SearchEngineCompleter {
  constructor() {
    this.previousSuggestions = null;
  }

  cancel() {
    CompletionSearch.cancel();
  }

  // This looks up the custom search engine and, if one is found, notes it and removes its keyword from the query terms.
  preprocessRequest(request) {
    SearchEngines.use(engines => {
      const { queryTerms, query } = request;
      Object.assign(request, { searchEngines: engines, keywords: Object.keys(engines) });
      const keyword = queryTerms[0];
      // Note. For a keyword "w", we match "w search terms" and "w ", but not "w" on its own.
      if (keyword && engines[keyword] && (queryTerms.length > 1 || /\S\s/.test(query))) {
        Object.assign(request, {
          queryTerms: queryTerms.slice(1),
          keyword,
          engine: engines[keyword],
          isCustomSearch: true,
        });
      }
    });
  }

  refresh(port) {
    this.previousSuggestions = {};
    SearchEngines.refreshAndUse(Settings.get('searchEngines'), function(engines) {
      // Let the front-end vomnibar know the search-engine keywords.  It needs to know them so that, when the
      // query goes from "w" to "w ", the vomnibar can synchronously launch the next filter() request (which
      // avoids an ugly delay/flicker).
      port.postMessage({
        handler: 'keywords',
        keywords: Object.keys(engines),
      });
    });
  }

  filter(request, onComplete) {
    let previousSuggestions;
    let suggestion;
    let { queryTerms, query, engine } = request;
    if (!engine) {
      return onComplete([]);
    }

    const { keyword, searchUrl, description } = engine;
    Object.assign(request, searchUrl, { customSearchMode: true });

    if (this.previousSuggestions[searchUrl] == null) {
      this.previousSuggestions[searchUrl] = [];
    }

    const haveCompletionEngine = CompletionSearch.haveCompletionEngine(searchUrl);

    // This filter is applied to all of the suggestions from all of the completers, after they have been
    // aggregated by the MultiCompleter.
    // We only keep suggestions which either *were* generated by this search engine, or *could have
    // been* generated by this search engine (and match the current query).
    // TODO(philc): convert to map
    const filter = suggestions => {
      const result = [];
      for (suggestion of suggestions) {
        if (suggestion.isSearchSuggestion || suggestion.isCustomSearch) {
          result.push(suggestion);
        } else {
          const terms = Utils.extractQuery(searchUrl, suggestion.url);
          if (!terms || !RankingUtils.matches(queryTerms, terms)) {
            continue;
          }
          suggestion.url = Utils.createSearchUrl(terms, searchUrl);
          result.push(suggestion);
        }
      }
      return result;
    };

    // If a previous suggestion still matches the query, then we keep it (even if the completion engine may not
    // return it for the current query).  This allows the user to pick suggestions that they've previously seen
    // by typing fragments of their text, without regard to whether the completion engine can continue to
    // complete the actual text of the query.
    if (queryTerms.length === 0) {
      previousSuggestions = [];
    } else {
      previousSuggestions = [];
      for (let suggestion of Object.values(this.previousSuggestions[searchUrl] || {})) {
        if (!RankingUtils.matches(queryTerms, suggestion.title)) {
          continue;
        }
        // Reset various fields, they may not be correct wrt. the current query.
        Object.assign(suggestion, { relevancy: null, html: null, queryTerms });
        suggestion.relevancy = null;
        previousSuggestions.push(suggestion);
      }
    }

    const primarySuggestion = new Suggestion({
      queryTerms,
      type: description,
      url: Utils.createSearchUrl(queryTerms, searchUrl),
      title: queryTerms.join(' '),
      searchUrl,
      relevancy: 2.0,
      autoSelect: true,
      highlightTerms: false,
      isSearchSuggestion: true,
      isPrimarySuggestion: true,
    });
    console.log('primarySuggestion', primarySuggestion);

    if (queryTerms.length === 0) {
      onComplete([primarySuggestion], { filter });
      return;
    }

    const mkSuggestion = (() => {
      let count = 0;
      return suggestion => {
        const url = Utils.createSearchUrl(suggestion, searchUrl);
        return (this.previousSuggestions[searchUrl][url] = new Suggestion({
          queryTerms,
          type: description,
          url,
          title: suggestion,
          searchUrl,
          insertText: suggestion,
          highlightTerms: false,
          highlightTermsExcludeUrl: true,
          isCustomSearch: true,
          relevancy: ++count === 1 ? 1.0 : null,
          relevancyFunction: this.computeRelevancy,
        }));
      };
    })();

    console.log('mkSuggestion', mkSuggestion);
    const cachedSuggestions = haveCompletionEngine ? CompletionSearch.complete(searchUrl, queryTerms) : null;

    const suggestions = previousSuggestions;
    suggestions.push(primarySuggestion);

    // console.log('>>>>>>>>>>>');
    // console.log('queryTerms.length', queryTerms.length, queryTerms.length === 0);
    // console.log('cachedSuggestions', cachedSuggestions, cachedSuggestions != null);
    // console.log('haveCompletionEngine', haveCompletionEngine, !haveCompletionEngine);

    if (queryTerms.length === 0 || cachedSuggestions != null || !haveCompletionEngine) {
      // There is no prospect of adding further completions, so we're done.
      if (cachedSuggestions != null) {
        suggestions.push(...(cachedSuggestions.map(mkSuggestion) || []));
      }
      console.log('suggestions', suggestions);
      onComplete(suggestions, { filter, continuation: null });
    } else {
      // Post the initial suggestions, but then deliver any further completions asynchronously, as a
      // continuation.
      onComplete(suggestions, {
        filter,
        continuation: onComplete => {
          CompletionSearch.complete(searchUrl, queryTerms, suggestions => {
            console.log('CompletionSearch', queryTerms, suggestions);
            if (suggestions == null) {
              suggestions = [];
            }
            if (SearchEngineCompleter.debug) {
              console.log('fetched suggestions:', suggestions.length, query);
            }
            onComplete(suggestions.map(mkSuggestion));
          });
        },
      });
    }
  }

  computeRelevancy({ relevancyData, queryTerms, title }) {
    // Tweaks:
    // - Calibration: we boost relevancy scores to try to achieve an appropriate balance between relevancy
    //   scores here, and those provided by other completers.
    // - Relevancy depends only on the title (which is the search terms), and not on the URL.
    return Suggestion.boostRelevancyScore(0.5, 0.7 * RankingUtils.wordRelevancy(queryTerms, title, title));
  }

  postProcessSuggestions(request, suggestions) {
    if (!request.searchEngines) {
      return;
    }

    const engines = Object.values(request.searchEngines);
    engines.sort((a, b) => b.searchUrl.length - a.searchUrl.length);
    engines.push({ keyword: null, description: 'search history', searchUrl: Settings.get('searchUrl') });
    for (let suggestion of suggestions) {
      if (!suggestion.isSearchSuggestion && !suggestion.insertText) {
        for (let engine of engines) {
          if ((suggestion.insertText = Utils.extractQuery(engine.searchUrl, suggestion.url))) {
            // suggestion.customSearchMode informs the vomnibar that, if the users edits the text from this
            // suggestion, then custom search-engine mode should be activated.
            suggestion.customSearchMode = engine.keyword;
            if (!suggestion.title) {
              suggestion.title = suggestion.insertText;
            }
            break;
          }
        }
      }
    }
  }
}

SearchEngineCompleter.debug = false;

// A completer which calls filter() on many completers, aggregates the results, ranks them, and returns the top
// 10. All queries from the vomnibar come through a multi completer.
const maxResults = 10;

class MultiCompleter {
  constructor(completers) {
    this.completers = completers;
    this.filterInProgress = false;
    this.mostRecentQuery = null;
  }

  refresh(port) {
    for (let c of this.completers) {
      if (c.refresh) {
        c.refresh(port);
      }
    }
  }

  cancel(port) {
    for (let c of this.completers) {
      if (c.refresh) {
        c.refresh(port);
      }
    }
  }

  filter(request, onComplete) {
    // Allow only one query to run at a time.
    if (this.filterInProgress) {
      this.mostRecentQuery = arguments;
      return;
    }

    // Provide each completer with an opportunity to see (and possibly alter) the request before it is
    // launched.
    if (Settings.debug) {
      console.log('>>>> this.completers:', this.completers);
    }
    for (let completer of this.completers) {
      if (completer.preprocessRequest) {
        completer.preprocessRequest(request);
      }
    }

    RegexpCache.clear();
    const queryTerms = request.queryTerms;

    this.mostRecentQuery = null;
    this.filterInProgress = true;
    let suggestions = [];
    const continuations = [];
    const filters = [];

    // Run each of the completers (asynchronously).
    let jobs = new JobRunner(
      this.completers.map(completer => {
        return callback => {
          completer.filter(request, function(newSuggestions, param) {
            if (newSuggestions == null) {
              newSuggestions = [];
            }
            if (param == null) {
              param = {};
            }
            const { continuation, filter } = param;
            suggestions.push(...newSuggestions);
            if (continuation != null) {
              continuations.push(continuation);
            }
            if (filter != null) {
              filters.push(filter);
            }
            callback();
          });
        };
      })
    );

    // 所有completers处理完成后发布结果, 然后运行continuations或者挂起的查询
    // Once all completers have finished, process the results and post them, and run any continuations or a pending query.
    jobs.onReady(() => {
      let filter;
      for (filter of filters) {
        suggestions = filter(suggestions);
      }
      const shouldRunContinuations = continuations.length > 0 && this.mostRecentQuery == null;

      // Post results, unless there are none and we will be running a continuation.  This avoids
      // collapsing the vomnibar briefly before expanding it again, which looks ugly.
      if (suggestions.length !== 0 || !shouldRunContinuations) {
        suggestions = this.prepareSuggestions(request, queryTerms, suggestions);

        onComplete({ results: suggestions });
      }

      // Run any continuations (asynchronously); for example, the search-engine completer
      // (SearchEngineCompleter) uses a continuation to fetch suggestions from completion engines
      // asynchronously.
      if (shouldRunContinuations) {
        jobs = new JobRunner(
          continuations.map(
            continuation =>
              function(callback) {
                continuation(function(newSuggestions) {
                  suggestions.push(...newSuggestions);
                  callback();
                });
              }
          )
        );

        jobs.onReady(() => {
          for (filter of filters) {
            suggestions = filter(suggestions);
          }
          suggestions = this.prepareSuggestions(request, queryTerms, suggestions);
          onComplete({ results: suggestions });
        });
      }

      // Admit subsequent queries and launch any pending query.
      this.filterInProgress = false;
      if (this.mostRecentQuery) {
        return this.filter(...this.mostRecentQuery);
      }
    });
  }

  prepareSuggestions(request, queryTerms, suggestions) {
    // Compute suggestion relevancies and sort.

    for (let s of suggestions) {
      s.computeRelevancy(queryTerms);
    }

    suggestions.sort((a, b) => b.relevancy - a.relevancy);

    // Simplify URLs and remove duplicates (duplicate simplified URLs, that is).
    let count = 0;
    const seenUrls = {};

    let newSuggestions = [];
    for (let s of suggestions) {
      const url = s.shortenUrl();
      if (s.deDuplicate && seenUrls[url]) {
        continue;
      }
      if (count++ === maxResults) {
        break;
      }
      seenUrls[url] = s;
      newSuggestions.push(s);
    }

    // Give each completer the opportunity to tweak the suggestions.
    for (let completer of this.completers) {
      if (completer.postProcessSuggestions) {
        completer.postProcessSuggestions(request, newSuggestions);
      }
    }
    for (let s of newSuggestions) {
      s.generateHtml(request);
    }

    return newSuggestions;
  }
}

// Utilities which help us compute a relevancy score for a given item.
var RankingUtils = {
  // Whether the given things (usually URLs or titles) match any one of the query terms.
  // This is used to prune out irrelevant suggestions before we try to rank them, and for calculating word relevancy.
  // Every term must match at least one thing.
  matches(queryTerms, ...things) {
    for (let term of queryTerms) {
      const regexp = RegexpCache.get(term);
      let matchedTerm = false;
      for (let thing of things) {
        if (!matchedTerm) {
          matchedTerm = thing.match(regexp);
        }
      }
      if (!matchedTerm) {
        return false;
      }
    }
    return true;
  },

  // Weights used for scoring matches.
  matchWeights: {
    matchAnywhere: 1,
    matchStartOfWord: 1,
    matchWholeWord: 1,
    // The following must be the sum of the three weights above; it is used for normalization.
    maximumScore: 3,
    //
    // Calibration factor for balancing word relevancy and recency.
    recencyCalibrator: 2.0 / 3.0,
  },
  // The current value of 2.0/3.0 has the effect of:
  //   - favoring the contribution of recency when matches are not on word boundaries ( because 2.0/3.0 > (1)/3     )
  //   - favoring the contribution of word relevance when matches are on whole words  ( because 2.0/3.0 < (1+1+1)/3 )

  // Calculate a score for matching term against string.
  // The score is in the range [0, matchWeights.maximumScore], see above.
  // Returns: [ score, count ], where count is the number of matched characters in string.
  scoreTerm(term, string) {
    let score = 0;
    let count = 0;
    const nonMatching = string.split(RegexpCache.get(term));
    if (nonMatching.length > 1) {
      // Have match.
      score = RankingUtils.matchWeights.matchAnywhere;
      count = nonMatching.reduce((p, c) => p - c.length, string.length);
      if (RegexpCache.get(term, '\\b').test(string)) {
        // Have match at start of word.
        score += RankingUtils.matchWeights.matchStartOfWord;
        if (RegexpCache.get(term, '\\b', '\\b').test(string)) {
          // Have match of whole word.
          score += RankingUtils.matchWeights.matchWholeWord;
        }
      }
    }
    return [score, count < string.length ? count : string.length];
  },

  //返回一个介于[0，1]之间的数字， queryTerms 在 url和title中出现的频率。
  wordRelevancy(queryTerms, url, title) {
    let titleCount, titleScore;
    let urlScore = (titleScore = 0.0);
    let urlCount = (titleCount = 0);
    // Calculate initial scores.
    for (let term of queryTerms) {
      let [s, c] = RankingUtils.scoreTerm(term, url);
      urlScore += s;
      urlCount += c;
      if (title) {
        [s, c] = RankingUtils.scoreTerm(term, title);
        titleScore += s;
        titleCount += c;
      }
    }

    const maximumPossibleScore = RankingUtils.matchWeights.maximumScore * queryTerms.length;

    // Normalize scores.
    urlScore /= maximumPossibleScore;
    urlScore *= RankingUtils.normalizeDifference(urlCount, url.length);

    if (title) {
      titleScore /= maximumPossibleScore;
      titleScore *= RankingUtils.normalizeDifference(titleCount, title.length);
    } else {
      titleScore = urlScore;
    }

    // Prefer matches in the title over matches in the URL.
    // In other words, don't let a poor urlScore pull down the titleScore.
    // For example, urlScore can be unreasonably poor if the URL is very long.
    if (urlScore < titleScore) {
      urlScore = titleScore;
    }

    // Return the average.
    return (urlScore + titleScore) / 2;
  },

  // Untested alternative to the above:
  //   - Don't let a poor urlScore pull down a good titleScore, and don't let a poor titleScore pull down a
  //     good urlScore.
  //
  // return Math.max(urlScore, titleScore)

  // Returns a score between [0, 1] which indicates how recent the given timestamp is. Items which are over
  // 一个月之前的 0 越新的权重越高
  // score than an item from two days ago.
  recencyScore(lastAccessedTime) {
    if (!this.oneMonthAgo) {
      this.oneMonthAgo = 1000 * 60 * 60 * 24 * 30;
    }
    const recency = Date.now() - lastAccessedTime;
    const recencyDifference = Math.max(0, this.oneMonthAgo - recency) / this.oneMonthAgo;

    // recencyScore is between [0, 1]. It is 1 when recenyDifference is 0. This quadratic equation will
    // incresingly discount older history entries.
    let recencyScore = recencyDifference * recencyDifference * recencyDifference;

    // Calibrate recencyScore vis-a-vis word-relevancy scores.
    return (recencyScore *= RankingUtils.matchWeights.recencyCalibrator);
  },

  // Takes the difference of two numbers and returns a number between [0, 1] (the percentage difference).
  normalizeDifference(a, b) {
    const max = Math.max(a, b);
    return (max - Math.abs(a - b)) / max;
  },
};

// We cache regexps because we use them frequently when comparing a query to history entries and bookmarks,
// and we don't want to create fresh objects for every comparison.
const RegexpCache = {
  init() {
    this.initialized = true;
    this.clear();
  },

  clear() {
    this.cache = {};
  },

  // Get rexexp for `string` from cache, creating it if necessary.
  // Regexp meta-characters in `string` are escaped.
  // Regexp is wrapped in `prefix`/`suffix`, which may contain meta-characters (these are not escaped).
  // With their default values, `prefix` and `suffix` have no effect.
  // Example:
  //   - string="go", prefix="\b", suffix=""
  //   - this returns regexp matching "google", but not "agog" (the "go" must occur at the start of a word)
  // TODO: `prefix` and `suffix` might be useful in richer word-relevancy scoring.
  get(string, prefix, suffix) {
    if (prefix == null) {
      prefix = '';
    }
    if (suffix == null) {
      suffix = '';
    }
    if (!this.initialized) {
      this.init();
    }
    let regexpString = Utils.escapeRegexSpecialCharacters(string);
    // Avoid cost of constructing new strings if prefix/suffix are empty (which is expected to be a common case).
    if (prefix) {
      regexpString = prefix + regexpString;
    }
    if (suffix) {
      regexpString = regexpString + suffix;
    }
    // Smartcase: Regexp is case insensitive, unless `string` contains a capital letter (testing `string`, not `regexpString`).
    return this.cache[regexpString] || (this.cache[regexpString] = new RegExp(regexpString, Utils.hasUpperCase(string) ? '' : 'i'));
  },
};

// Provides cached access to Chrome's history. As the user browses to new pages, we add those pages to this
// history cache.
var HistoryCache = {
  size: 20000,
  history: null, // An array of History items returned from Chrome.

  reset() {
    this.history = null;
    this.callbacks = null;
  },

  use(callback) {
    // TODO(philc): Are these return statements required?
    if (this.history != null) {
      return callback(this.history);
    } else {
      return this.fetchHistory(callback);
    }
  },

  fetchHistory(callback) {
    if (this.callbacks) {
      this.callbacks.push(callback);
      return;
    }
    this.callbacks = [callback];
    return chrome.history.search({ text: '', maxResults: this.size, startTime: 0 }, history => {
      // On Firefox, some history entries do not have titles.
      history.map(entry => (entry.title != null ? entry.title : (entry.title = '')));
      history.sort(this.compareHistoryByUrl);
      this.history = history;
      chrome.history.onVisited.addListener(this.onPageVisited.bind(this));
      chrome.history.onVisitRemoved.addListener(this.onVisitRemoved.bind(this));
      for (callback of this.callbacks) {
        callback(this.history);
      }
      this.callbacks = null;
    });
  },

  compareHistoryByUrl(a, b) {
    if (a.url === b.url) {
      return 0;
    }
    if (a.url > b.url) {
      return 1;
    }
    return -1;
  },

  // When a page we've seen before has been visited again, be sure to replace our History item so it has the
  // correct "lastVisitTime". That's crucial for ranking Vomnibar suggestions.
  onPageVisited(newPage) {
    // On Firefox, some history entries do not have titles.
    if (newPage.title == null) {
      newPage.title = '';
    }
    const i = HistoryCache.binarySearch(newPage, this.history, this.compareHistoryByUrl);
    const pageWasFound = (this.history[i] != null ? this.history[i].url : undefined) === newPage.url;
    if (pageWasFound) {
      this.history[i] = newPage;
    } else {
      this.history.splice(i, 0, newPage);
    }
  },

  // When a page is removed from the chrome history, remove it from the vimium history too.
  onVisitRemoved(toRemove) {
    if (toRemove.allHistory) {
      this.history = [];
    } else {
      toRemove.urls.forEach(url => {
        const i = HistoryCache.binarySearch({ url }, this.history, this.compareHistoryByUrl);
        if (i < this.history.length && this.history[i].url === url) {
          this.history.splice(i, 1);
        }
      });
    }
  },
};

// Returns the matching index or the closest matching index if the element is not found. That means you
// must check the element at the returned index to know whether the element was actually found.
// This method is used for quickly searching through our history cache.
HistoryCache.binarySearch = function(targetElement, array, compareFunction) {
  let element, middle;
  let high = array.length - 1;
  let low = 0;

  while (low <= high) {
    middle = Math.floor((low + high) / 2);
    element = array[middle];
    const compareResult = compareFunction(element, targetElement);
    if (compareResult > 0) {
      high = middle - 1;
    } else if (compareResult < 0) {
      low = middle + 1;
    } else {
      return middle;
    }
  }
  // We didn't find the element. Return the position where it should be in this array.
  if (compareFunction(element, targetElement) < 0) {
    return middle + 1;
  } else {
    return middle;
  }
};

Object.assign(global, {
  UtilsCompleter,
  FrameCompleter,
  CSDNCompleter,
  Suggestion,
  BookmarkCompleter,
  MultiCompleter,
  HistoryCompleter,
  DomainCompleter,
  TabCompleter,
  SearchEngineCompleter,
  HistoryCache,
  RankingUtils,
  RegexpCache,
});
