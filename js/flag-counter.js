// MIWAI 2027 live visitor counter.
const flagCounterConfig = { imageUrl: "https://s05.flagcounter.com/count/bHwY/bg_102840/txt_FFFFFF/border_31516D/columns_2/maxflags_30/viewers_0/labels_1/pageviews_1/flags_1/percent_0/", statisticsUrl: "https://info.flagcounter.com/bHwY" };
(function () {
  const status = document.getElementById('flagCounterStatus');
  const img = document.getElementById('flagCounterImage');
  const link = document.getElementById('flagCounterImageLink');
  const more = document.getElementById('flagCounterMore');
  if (!flagCounterConfig.imageUrl || !flagCounterConfig.statisticsUrl) return;
  try {
    const image = new URL(flagCounterConfig.imageUrl), stats = new URL(flagCounterConfig.statisticsUrl);
    if ([image,stats].some(u => u.protocol !== 'https:' || !(u.hostname === 'flagcounter.com' || u.hostname.endsWith('.flagcounter.com')))) throw Error('Invalid counter URL');
    link.href = more.href = stats.href;
    more.hidden = false;
    status.textContent = 'Loading visitor statistics…';
    img.addEventListener('load', () => { link.hidden = false; status.hidden = true; });
    img.addEventListener('error', () => { link.hidden = true; status.hidden = false; status.textContent = 'Visitor counter unavailable. Try the statistics link.'; });
    img.src = image.href;
  } catch(e) { status.textContent = 'Visitor counter configuration needs attention.'; }
})();
