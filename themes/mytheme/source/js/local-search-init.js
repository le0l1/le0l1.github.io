// 简单本地搜索弹窗实现
window.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('local-search-form');
  var input = document.getElementById('local-search-input');
  var resultBox = document.createElement('div');
  resultBox.id = 'local-search-result';
  resultBox.style.position = 'absolute';
  resultBox.style.background = '#fff';
  resultBox.style.border = '1px solid #ccc';
  resultBox.style.maxHeight = '300px';
  resultBox.style.overflowY = 'auto';
  resultBox.style.width = '300px';
  resultBox.style.zIndex = '9999';
  resultBox.style.display = 'none';
  document.body.appendChild(resultBox);

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    window.hexoSearch && window.hexoSearch(input.value, function(results) {
      showResults(results);
    });
  });
  input.addEventListener('input', function() {
    if (input.value.length > 1) {
      window.hexoSearch && window.hexoSearch(input.value, function(results) {
        showResults(results);
      });
    } else {
      resultBox.style.display = 'none';
    }
  });
  function showResults(results) {
    if (!results || results.length === 0) {
      resultBox.innerHTML = '<div style="padding:8px;">无结果</div>';
    } else {
      resultBox.innerHTML = results.map(function(item) {
        return '<div style="padding:8px;border-bottom:1px solid #eee;"><a href="' + item.path + '" style="color:#111;text-decoration:none;">' + item.title + '</a></div>';
      }).join('');
    }
    var rect = input.getBoundingClientRect();
    resultBox.style.left = (rect.left + window.scrollX) + 'px';
    resultBox.style.top = (rect.bottom + window.scrollY) + 'px';
    resultBox.style.display = 'block';
  }
  document.addEventListener('click', function(e) {
    if (!form.contains(e.target) && !resultBox.contains(e.target)) {
      resultBox.style.display = 'none';
    }
  });
}); 