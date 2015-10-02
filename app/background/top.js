window.App = window.App || {};
window.App.Top = function() {
  const Top = {};

  Top.getTops = getTops;
  Top.getDigest = getDigest;

  const B_NEUTRAL = '0_0';
  const B_EQUAL = '2_2';
  const B_MOSTLY_POSITIVE = '1_2';
  const B_MOSTLY_NEGATIVE = '2_1';
  const B_NEGATIVE = '2_0';
  const B_POSITIVE = '0_2';

  return Top;

  function getTops(comments) {
    const best = _(comments)
      .filter(c => c.rank > 0)
      .sortBy(['rank'], ['desc'])
      .value();

    const worst = _(comments)
      .filter(c => c.rank < 0)
      .sortBy(['rank'], ['asc'])
      .value();

    return {
      best,
      worst,
    };
  }

  function getDigest(tops) {
    const bestRank = getSingleRank(tops.best);
    const worstRank = getSingleRank(tops.worst);
    const balance = getBalance(bestRank, worstRank);
    const icon = `icon_${balance}.png`;
    return {
      icon,
      bestRank,
      worstRank,
    };
  }

  function getBalance(pos, neg) {
    neg = -neg;
    if (pos === 0 && neg === 0) {
      return B_NEUTRAL;
    }
    const diff = percentageDifference(pos, neg);
    if (diff < 20) {
      return B_EQUAL;
    }
    if (diff > 80) {
      return pos > neg ?
        B_POSITIVE : B_NEGATIVE;
    }
    return pos > neg ?
      B_MOSTLY_POSITIVE : B_MOSTLY_NEGATIVE;
  }

  function percentageDifference(a, b) {
    const max = Math.max(a, b);
    const min = Math.min(a, b);
    const diff = 100 - (min / max * 100);
    return diff;
  }

  function getSingleRank(top) {
    const head = top[0];
    return head ? head.rank : 0;
  }

}();