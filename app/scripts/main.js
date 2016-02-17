(function() {
  'use strict';
  // same height membership columns
  var membershipColumns = document.querySelectorAll('.same-height .message-body');
  var membershipColumnsMaxHeight = 0;
  Array.prototype.forEach.call(membershipColumns, function(el) {
    membershipColumnsMaxHeight = Math.max(membershipColumnsMaxHeight, el.offsetHeight);
  });
  Array.prototype.forEach.call(membershipColumns, function(el) {
    el.style.minHeight = membershipColumnsMaxHeight + 'px';
  });

})();
