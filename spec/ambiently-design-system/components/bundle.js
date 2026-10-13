/* @ds-bundle: {"format":4,"namespace":"Ambiently","components":[{"name":"Logo"},{"name":"Icon"},{"name":"Button"},{"name":"IconButton"},{"name":"Toggle"},{"name":"Select"},{"name":"Badge"},{"name":"Delta"},{"name":"Card"},{"name":"Stat"},{"name":"LineChart"},{"name":"BarChart"},{"name":"Ring"},{"name":"Sidebar"}]} */
(function () {
  'use strict';
  var React = window.React;
  if (!React) { throw new Error('Ambiently: React 18 must be on the page before bundle.js'); }
  var h = React.createElement;
  var useState = React.useState, useRef = React.useRef, useEffect = React.useEffect, useLayoutEffect = React.useLayoutEffect, useMemo = React.useMemo;

  function cx() { var out = []; for (var i = 0; i < arguments.length; i++) { if (arguments[i]) out.push(arguments[i]); } return out.join(' '); }

  /* ---------- Logo: the mark traced dot-for-dot from the supplied file ---------- */
  var LOGO_DOTS = [526.5,504.0,21.6,472.5,504.0,21.7,499.5,463.5,22.0,499.5,543.8,21.5,551.7,466.3,20.0,447.5,466.0,20.1,553.8,543.4,20.9,445.4,543.3,20.9,580.8,503.3,20.3,526.1,423.4,21.4,472.8,423.4,21.3,418.2,503.3,20.2,526.2,582.8,20.6,472.7,582.8,20.7,576.2,427.3,19.0,423.0,427.5,18.9,603.6,463.2,18.8,395.6,463.3,18.7,582.7,580.5,19.2,609.0,539.2,19.2,416.7,580.5,19.1,390.3,539.4,19.1,499.6,383.0,21.3,499.6,622.0,19.5,551.8,385.0,19.3,447.4,385.2,19.1,554.1,619.4,18.4,631.5,497.7,18.1,445.0,619.6,18.6,368.0,497.2,18.1,371.2,426.0,17.7,398.6,391.2,17.6,600.6,389.9,17.9,628.8,424.7,18.0,635.3,578.1,17.8,365.5,579.5,17.5,524.7,343.7,19.3,473.8,343.8,19.3,608.5,615.6,16.0,391.5,616.3,15.7,471.3,657.2,17.7,527.3,657.5,17.9,343.4,538.9,15.9,343.6,457.1,16.1,658.2,537.6,16.2,657.8,457.7,16.8,330.6,503.2,12.0,424.1,348.2,17.8,574.1,347.1,17.7,673.3,499.2,13.6,580.5,654.5,16.2,418.0,654.8,16.2,375.9,356.0,14.0,347.4,385.0,14.7,498.1,691.5,14.9,652.5,382.4,14.9,623.5,351.9,14.7,306.5,473.8,12.9,499.8,304.7,17.8,677.9,418.4,12.4,656.2,619.3,12.8,320.9,417.6,14.6,678.1,584.7,11.2,315.6,570.4,13.7,445.2,690.0,13.8,337.5,612.8,13.6,553.5,690.7,14.2,629.2,651.6,12.4,550.1,306.9,16.1,448.8,307.0,16.9,364.7,650.5,13.6,699.4,464.7,13.0,696.3,552.8,10.8,296.1,529.1,13.2,396.7,316.6,14.2,710.3,514.8,11.5,601.0,314.9,14.4,604.1,687.4,12.7,394.5,687.3,12.4,470.7,724.7,12.1,524.3,726.3,12.1,279.1,441.9,12.1,348.4,327.1,12.4,269.0,493.0,12.0,472.1,268.7,15.8,524.5,268.3,15.4,422.8,721.1,9.9,579.2,721.9,11.2,649.0,683.7,10.5,708.5,388.3,11.6,313.3,354.1,13.0,708.0,613.9,10.3,683.1,650.8,9.6,275.5,576.6,11.2,683.7,349.6,12.1,418.2,277.0,14.3,287.8,393.3,12.0,728.3,433.3,11.6,575.2,273.6,14.1,321.3,658.2,11.1,654.7,317.7,13.3,291.1,620.5,11.0,740.7,483.2,10.3,732.0,577.2,9.7,348.5,692.1,10.5,253.5,537.8,10.8,623.7,283.3,13.1,749.2,537.4,9.9,366.1,286.5,12.7,622.9,720.6,9.9,385.7,726.9,9.6,498.1,761.1,10.1,446.5,755.7,9.6,551.4,758.2,9.1,235.5,466.9,10.9,497.5,231.6,15.7,442.4,237.0,13.7,551.5,234.7,14.2,241.0,415.9,10.8,601.9,245.3,11.2,698.1,690.0,9.4,771.8,461.6,9.6,391.9,247.2,11.8,311.3,299.3,11.5,242.2,600.8,9.4,732.5,651.6,9.3,765.6,415.2,10.4,275.4,334.5,11.0,252.0,371.9,10.8,723.7,330.7,10.9,749.0,370.2,10.3,668.5,725.0,9.2,218.8,513.2,10.0,261.7,651.5,9.5,614.0,758.8,9.4,783.3,503.9,8.6,692.9,292.3,11.3,292.4,694.1,9.4,330.8,729.3,9.4,764.2,608.8,9.0,220.9,561.9,9.4,660.3,260.4,11.6,337.4,258.6,11.0,407.3,776.0,9.0,366.7,761.0,9.2,787.1,561.9,9.0,465.4,795.4,9.1,525.1,796.6,9.1,580.4,786.7,8.8,466.1,199.0,12.6,417.6,208.3,11.4,530.6,196.9,13.2,637.7,227.0,9.8,589.1,207.3,11.7,196.6,437.6,9.6,365.0,221.0,10.1,237.0,677.3,8.5,182.7,484.7,9.1,210.3,632.3,8.5,817.1,465.9,9.2,720.7,730.5,8.7,201.0,387.5,8.8,193.6,590.9,8.4,224.6,337.2,9.6,768.0,324.1,9.9,808.8,413.3,9.4,757.8,691.1,8.6,287.6,259.1,10.3,792.4,366.4,9.8,784.7,649.4,8.5,678.5,768.4,8.2,179.2,538.9,8.9,637.3,794.0,8.5,251.8,290.8,9.8,824.2,524.9,8.6,261.2,722.5,7.5,814.1,591.9,7.5,742.6,279.8,9.8,301.8,763.3,8.0,707.1,242.9,10.0,402.0,817.7,8.2,345.4,796.7,8.2,593.6,823.4,8.2,669.5,207.7,9.3,321.7,212.8,10.1,556.8,833.8,7.8,449.0,834.8,8.2,386.6,180.0,10.6,502.2,840.0,8.3,498.0,158.2,10.9,614.1,177.4,10.0,439.8,162.2,10.9,559.4,158.8,10.3,213.9,711.2,7.5,147.5,450.0,8.3,777.7,723.7,7.5,182.9,663.3,7.9,849.5,571.8,7.7,736.0,769.2,7.3,157.1,396.2,8.0,158.5,613.5,7.6,139.2,504.8,7.8,859.6,462.7,7.5,814.9,678.1,7.3,200.7,296.5,8.7,806.2,305.6,8.5,172.2,344.6,8.2,839.3,629.3,7.2,851.0,406.6,7.8,141.6,560.6,7.4,242.0,756.8,7.2,833.6,353.4,7.9,864.1,519.0,7.3,689.8,812.9,7.1,641.7,839.5,7.0,776.1,256.5,8.3,265.9,214.3,8.8,738.1,215.4,8.4,227.8,247.4,8.5,278.7,800.9,6.9,369.1,852.8,7.5,320.0,830.5,6.7,424.9,869.9,6.8,308.9,173.1,9.0,358.4,148.5,9.5,590.2,868.0,7.0,466.6,122.5,9.1,536.8,877.4,6.6,478.8,879.1,7.3,697.1,173.8,8.3,645.1,147.3,9.1,582.6,124.6,8.8,412.6,125.5,8.6,522.5,115.6,9.0,793.9,768.6,6.0,751.0,811.0,6.1,163.0,717.5,6.0,831.9,725.3,5.9,100.8,445.7,6.0,96.1,500.3,6.4,889.8,394.0,6.1,904.0,509.1,6.0,901.3,451.7,5.8,898.4,568.0,5.5,133.0,670.0,5.8,198.6,769.7,5.8,863.4,678.4,5.8,110.6,387.9,6.1,111.7,616.0,6.0,98.8,561.8,5.9,873.4,339.4,6.1,886.8,625.1,5.9,703.1,853.0,6.0,848.6,288.3,6.0,127.1,332.6,5.9,153.1,280.9,6.2,817.9,240.0,6.3,234.4,814.9,5.8,654.4,883.4,5.8,182.5,235.0,6.5,778.9,193.6,6.6,283.4,855.0,5.6,221.7,189.6,6.8,332.0,882.8,5.5,609.9,903.9,5.8,386.1,903.7,5.7,267.0,151.1,7.1,442.6,917.2,5.7,556.2,917.4,5.8,737.2,151.9,6.3,500.4,921.5,5.7,374.7,96.4,6.9,318.5,118.0,6.3,683.4,118.2,7.1,621.1,93.9,6.8,557.8,78.6,8.0,435.7,78.5,7.0,493.6,72.6,6.7,809.6,821.4,5.2,854.1,773.0,5.4,766.7,861.0,5.3,945.4,556.3,5.2,934.8,612.3,5.1,55.3,435.4,5.2,949.5,495.5,5.3,50.5,492.6,5.2,889.7,724.8,5.2,63.6,609.9,5.4,945.8,437.9,5.1,52.8,551.5,5.3,917.0,669.9,5.1,66.2,378.3,5.3,81.9,668.2,5.3,108.2,723.0,5.6,935.3,382.3,5.3,140.1,772.8,5.6,917.4,324.7,5.3,83.4,322.1,5.2,108.9,269.5,5.3,891.7,270.1,5.2,721.6,896.7,5.3,177.3,820.3,5.3,859.0,220.0,5.2,141.2,218.6,5.4,221.7,861.8,5.3,820.1,171.5,5.4,179.4,171.4,5.4,669.2,927.2,5.4,271.2,899.1,5.3,226.9,129.2,5.7,775.1,130.0,5.4,723.5,96.2,5.7,325.9,928.0,5.5,662.5,66.5,5.8,330.6,68.9,5.4,445.7,960.1,5.1,611.0,949.9,5.2,276.6,94.0,5.7,385.5,949.7,5.2,595.5,45.2,5.8,391.4,48.0,5.9,555.0,962.6,5.4,503.4,966.5,5.2,527.6,34.2,5.9,457.6,34.9,5.9]; /* [cx, cy, r, ...] on a 1000-unit square */
  var LOGO_INK = { gold: 'var(--gold)', accent: 'var(--accent)', ink: 'currentColor' };

  function Mark(props) {
    var size = props.size || 40;
    var ink = LOGO_INK[props.ink || 'gold'] || props.ink;
    var circles = [];
    for (var i = 0; i < LOGO_DOTS.length; i += 3) {
      circles.push(h('circle', { key: i, cx: LOGO_DOTS[i], cy: LOGO_DOTS[i + 1], r: LOGO_DOTS[i + 2] }));
    }
    return h('svg', { className: cx('amb-logo-mark', props.className), width: size, height: size, viewBox: '0 0 1000 1000', style: { fill: ink }, 'aria-hidden': props.decorative ? 'true' : undefined, role: props.decorative ? undefined : 'img', 'aria-label': props.decorative ? undefined : 'Ambiently' }, circles);
  }

  function Logo(props) {
    var variant = props.variant || 'lockup';
    var size = props.size || 32;
    var ink = props.ink || 'gold';
    if (variant === 'mark') return h(Mark, { size: size, ink: ink, className: props.className });
    if (variant === 'app-icon') {
      var tile = props.size || 64;
      return h('span', { className: cx('amb-logo-tile', props.className), style: { width: tile, height: tile, borderRadius: Math.round(tile * 0.225) }, role: 'img', 'aria-label': 'Ambiently' },
        h(Mark, { size: Math.round(tile * 0.68), ink: ink, decorative: true }));
    }
    var word = h('span', { className: 'amb-logo-word', style: { fontSize: size } }, 'Ambiently');
    var tag = props.tagline ? h('span', { className: 'amb-logo-tag', style: { fontSize: Math.max(9, Math.round(size * 0.28)) } }, 'Real-world insights. Quieter.') : null;
    if (variant === 'wordmark') {
      return h('span', { className: cx('amb-logo', props.className) }, h('span', { className: 'amb-logo-text' }, word, tag));
    }
    return h('span', { className: cx('amb-logo', props.className) },
      h(Mark, { size: Math.round(size * 1.4), ink: ink, decorative: true }),
      h('span', { className: 'amb-logo-text' }, word, tag));
  }

  /* ---------- Icon ---------- */
  var ICONS = {"data":"<path d=\"M3 20h18M5.5 20v-8h3.5v8M10.25 20V9h3.5v11M15 20V5h3.5v15\"/>","telemetry":"<circle cx=\"12\" cy=\"12\" r=\"1.5\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M8.5 15.5a5 5 0 0 1 0-7M15.5 8.5a5 5 0 0 1 0 7M5.6 18.4a9 9 0 0 1 0-12.8M18.4 5.6a9 9 0 0 1 0 12.8\"/>","connect":"<circle cx=\"18\" cy=\"5\" r=\"2.5\"/><circle cx=\"6\" cy=\"12\" r=\"2.5\"/><circle cx=\"18\" cy=\"19\" r=\"2.5\"/><path d=\"M8.2 10.75l7.6-4.5M8.2 13.25l7.6 4.5\"/>","cloud":"<path d=\"M17.5 19H8.5a5 5 0 0 1-.6-9.96A6.5 6.5 0 0 1 19.6 10.5 4.25 4.25 0 0 1 17.5 19Z\"/>","location":"<path d=\"M12 21s-6.5-5.6-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Z\"/><circle cx=\"12\" cy=\"10.5\" r=\"2.25\"/>","storage":"<ellipse cx=\"12\" cy=\"5.5\" rx=\"7\" ry=\"2.75\"/><path d=\"M5 5.5v13c0 1.52 3.13 2.75 7 2.75s7-1.23 7-2.75v-13M5 12c0 1.52 3.13 2.75 7 2.75s7-1.23 7-2.75\"/>","security":"<path d=\"M12 3l7.5 3v6c0 4.6-3.2 7.7-7.5 9-4.3-1.3-7.5-4.4-7.5-9V6L12 3Z\"/>","people":"<circle cx=\"12\" cy=\"8\" r=\"3.75\"/><path d=\"M5 20.25c0-3.73 3.13-6.25 7-6.25s7 2.52 7 6.25\"/>","overview":"<rect x=\"4\" y=\"4\" width=\"7\" height=\"7\" rx=\"1.75\"/><rect x=\"13\" y=\"4\" width=\"7\" height=\"7\" rx=\"1.75\"/><rect x=\"4\" y=\"13\" width=\"7\" height=\"7\" rx=\"1.75\"/><rect x=\"13\" y=\"13\" width=\"7\" height=\"7\" rx=\"1.75\"/>","sensors":"<circle cx=\"12\" cy=\"18\" r=\"1.25\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M8.5 14.5a5 5 0 0 1 7 0M5.3 11.3a9.5 9.5 0 0 1 13.4 0\"/>","alerts":"<path d=\"M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.75H4.5L6 16.5ZM10 20.5a2 2 0 0 0 4 0\"/>","settings":"<path d=\"M4 7h8.5M17.5 7H20M4 12h2.5M11 12h9M4 17h10.5M19.5 17H20\"/><circle cx=\"15\" cy=\"7\" r=\"2.25\"/><circle cx=\"8.5\" cy=\"12\" r=\"2.25\"/><circle cx=\"17\" cy=\"17\" r=\"2.25\"/>","search":"<circle cx=\"11\" cy=\"11\" r=\"6.5\"/><path d=\"M20 20l-4.4-4.4\"/>","chevron-down":"<path d=\"M6 9l6 6 6-6\"/>","chevron-up":"<path d=\"M6 15l6-6 6 6\"/>","chevron-right":"<path d=\"M9 6l6 6-6 6\"/>","chevron-left":"<path d=\"M15 6l-6 6 6 6\"/>","play":"<path d=\"M8 5.5v13l10-6.5L8 5.5Z\"/>","arrow-right":"<path d=\"M4 12h16M13 5l7 7-7 7\"/>","arrow-up":"<path d=\"M12 20V4M5 11l7-7 7 7\"/>","arrow-down":"<path d=\"M12 4v16M5 13l7 7 7-7\"/>","arrow-up-right":"<path d=\"M7 17L17 7M8 7h9v9\"/>","check":"<path d=\"M5 12.5l4.5 4.5L19 7\"/>","close":"<path d=\"M6 6l12 12M18 6L6 18\"/>","plus":"<path d=\"M12 5v14M5 12h14\"/>","minus":"<path d=\"M5 12h14\"/>","more":"<circle cx=\"5\" cy=\"12\" r=\"1.25\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"12\" cy=\"12\" r=\"1.25\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"19\" cy=\"12\" r=\"1.25\" fill=\"currentColor\" stroke=\"none\"/>","info":"<circle cx=\"12\" cy=\"12\" r=\"8.75\"/><path d=\"M12 11v5.5M12 7.75v.25\"/>","calendar":"<rect x=\"4\" y=\"5\" width=\"16\" height=\"16\" rx=\"2.5\"/><path d=\"M4 10h16M8 3v4M16 3v4\"/>","clock":"<circle cx=\"12\" cy=\"12\" r=\"8.75\"/><path d=\"M12 7.5V12l3 2\"/>","download":"<path d=\"M12 4v11M7 10l5 5 5-5M4 19h16\"/>","filter":"<path d=\"M4 6h16M7 12h10M10 18h4\"/>","spend":"<path d=\"M12 2.5v19M16 7.25A3.75 3.75 0 0 0 12.25 5h-.5a3.25 3.25 0 0 0 0 6.5h.5a3.25 3.25 0 0 1 0 6.5h-.5A3.75 3.75 0 0 1 8 15.75\"/>","model":"<rect x=\"5\" y=\"5\" width=\"14\" height=\"14\" rx=\"2.5\"/><rect x=\"9\" y=\"9\" width=\"6\" height=\"6\" rx=\"1\"/><path d=\"M9 2.5V5M15 2.5V5M9 19v2.5M15 19v2.5M2.5 9H5M2.5 15H5M19 9h2.5M19 15h2.5\"/>","external":"<path d=\"M14 5h5v5M19 5l-8 8M15 13.5V18a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1h4.5\"/>"};
  var ICON_NAMES = Object.keys(ICONS);
  function Icon(props) {
    var size = props.size || 20;
    var body = ICONS[props.name];
    if (!body) return null;
    return h('svg', { className: cx('amb-icon', size <= 16 && 'is-sm', props.className), width: size, height: size, viewBox: '0 0 24 24', 'aria-hidden': props.label ? undefined : 'true', role: props.label ? 'img' : undefined, 'aria-label': props.label, style: props.style, dangerouslySetInnerHTML: { __html: body } });
  }
  Icon.names = ICON_NAMES;

  /* ---------- Button ---------- */
  function Button(props) {
    var variant = props.variant || 'secondary', size = props.size || 'md';
    var Tag = props.href ? 'a' : 'button';
    var rest = {};
    for (var k in props) if (['variant', 'size', 'icon', 'iconAfter', 'children', 'className'].indexOf(k) < 0) rest[k] = props[k];
    if (Tag === 'button' && !rest.type) rest.type = 'button';
    rest.className = cx('amb-btn', 'is-' + variant, 'is-' + size, props.className);
    var iconSize = size === 'sm' ? 16 : 20;
    return h(Tag, rest,
      props.icon ? h(Icon, { name: props.icon, size: iconSize }) : null,
      props.children != null ? h('span', null, props.children) : null,
      props.iconAfter ? h(Icon, { name: props.iconAfter, size: iconSize }) : null);
  }

  function IconButton(props) {
    var size = props.size || 'md';
    var rest = {};
    for (var k in props) if (['icon', 'label', 'size', 'variant', 'className'].indexOf(k) < 0) rest[k] = props[k];
    if (!rest.type) rest.type = 'button';
    rest['aria-label'] = props.label;
    rest.title = props.title || props.label;
    rest.className = cx('amb-btn', 'is-icon', 'is-' + (props.variant || 'secondary'), 'is-' + size, props.className);
    return h('button', rest, h(Icon, { name: props.icon, size: size === 'sm' ? 16 : 20 }));
  }

  /* ---------- Toggle ---------- */
  function Toggle(props) {
    var controlled = typeof props.checked === 'boolean';
    var state = useState(!!props.defaultChecked);
    var on = controlled ? props.checked : state[0];
    function flip() {
      if (props.disabled) return;
      if (!controlled) state[1](!on);
      if (props.onChange) props.onChange(!on);
    }
    var sw = h('button', { type: 'button', role: 'switch', 'aria-checked': on ? 'true' : 'false', 'aria-label': props.label ? undefined : props['aria-label'], className: 'amb-toggle-track', disabled: props.disabled, onClick: flip });
    if (!props.label) return sw;
    return h('label', { className: cx('amb-toggle', props.className) }, sw, h('span', null, props.label));
  }

  /* ---------- Select ---------- */
  function Select(props) {
    var rest = {};
    for (var k in props) if (['options', 'size', 'className', 'label'].indexOf(k) < 0) rest[k] = props[k];
    rest['aria-label'] = props['aria-label'] || props.label;
    var opts = (props.options || []).map(function (o) {
      var v = typeof o === 'string' ? o : o.value, l = typeof o === 'string' ? o : o.label;
      return h('option', { key: v, value: v }, l);
    });
    return h('span', { className: cx('amb-select', props.size === 'sm' && 'is-sm', props.className) },
      h('select', rest, opts),
      h(Icon, { name: 'chevron-down', size: 16, className: 'amb-select-chevron' }));
  }

  /* ---------- Badge & Delta ---------- */
  function Badge(props) {
    var tone = props.tone || 'neutral';
    return h('span', { className: cx('amb-badge', 'is-' + tone, props.className) },
      tone === 'live' ? h('span', { className: 'amb-dot', 'aria-hidden': 'true' }) : null,
      props.icon ? h(Icon, { name: props.icon, size: 14 }) : null,
      props.children);
  }

  function Delta(props) {
    var v = Number(props.value) || 0;
    var upIsGood = props.upIsGood !== false;
    var dir = v > 0 ? 'up' : v < 0 ? 'down' : 'flat';
    var tone = dir === 'flat' ? 'neutral' : ((dir === 'up') === upIsGood ? 'positive' : 'negative');
    var text = (v > 0 ? '+' : '') + (props.format ? props.format(v) : (Math.round(v * 10) / 10) + (props.suffix == null ? '%' : props.suffix));
    var srText = (dir === 'up' ? 'up ' : dir === 'down' ? 'down ' : 'unchanged ') + text + (props.period ? ' ' + props.period : '');
    return h('span', { className: cx('amb-delta', 'is-' + tone, props.className), title: srText },
      dir !== 'flat' ? h(Icon, { name: dir === 'up' ? 'arrow-up' : 'arrow-down', size: 12 }) : null,
      h('span', null, text),
      props.period ? h('span', { className: 'amb-delta-period' }, props.period) : null);
  }

  /* ---------- Card ---------- */
  function Card(props) {
    var head = (props.title || props.action) ? h('div', { className: 'amb-card-head' },
      h('div', null,
        props.title ? h('h3', { className: 'amb-card-title' }, props.title) : null,
        props.subtitle ? h('p', { className: 'amb-card-sub' }, props.subtitle) : null),
      props.action ? h('div', { className: 'amb-card-action' }, props.action) : null) : null;
    return h('section', { className: cx('amb-card', props.compact && 'is-compact', props.className), style: props.style }, head, props.children);
  }

  /* ---------- number formatting ---------- */
  function compact(v, prefix) {
    prefix = prefix || '';
    var a = Math.abs(v), s = v < 0 ? '-' : '';
    var out;
    if (a >= 1e9) out = trim(a / 1e9) + 'B';
    else if (a >= 1e6) out = trim(a / 1e6) + 'M';
    else if (a >= 1e4) out = trim(a / 1e3) + 'K';
    else if (a >= 1000) out = Math.round(a).toLocaleString('en-US');
    else if (a >= 100) out = String(Math.round(a));
    else out = String(Math.round(a * 10) / 10);
    return s + prefix + out;
    function trim(x) { return x >= 100 ? String(Math.round(x)) : x >= 10 ? String(Math.round(x * 10) / 10) : String(Math.round(x * 100) / 100); }
  }
  function niceTicks(max, count) {
    if (!(max > 0)) return [0, 1];
    var raw = max / count, p = Math.pow(10, Math.floor(Math.log10(raw))), step = p, best = Infinity;
    [1, 2, 2.5, 5, 10].forEach(function (m) {
      var c = Math.ceil(max / (m * p)), score = Math.abs(c - count) - (c > count ? 0.1 : 0);
      if (score < best) { best = score; step = m * p; }
    });
    var ticks = [0], t = 0;
    while (t < max - step * 1e-9) { t += step; ticks.push(Math.round(t * 1e6) / 1e6); }
    return ticks;
  }
  function useWidth(fallback) {
    var ref = useRef(null);
    var st = useState(fallback);
    useLayoutEffect(function () {
      var el = ref.current; if (!el) return;
      function measure() { var w = el.getBoundingClientRect().width; if (w && Math.abs(w - st[0]) > 0.5) st[1](w); }
      measure();
      if (typeof ResizeObserver === 'undefined') { window.addEventListener('resize', measure); return function () { window.removeEventListener('resize', measure); }; }
      var ro = new ResizeObserver(measure); ro.observe(el);
      return function () { ro.disconnect(); };
    });
    return [ref, st[0]];
  }
  function monotonePath(pts) {
    var n = pts.length; if (n === 0) return '';
    if (n === 1) return 'M' + pts[0][0] + ' ' + pts[0][1];
    var d = [], m = [], i;
    for (i = 0; i < n - 1; i++) { var dx = pts[i + 1][0] - pts[i][0]; d.push(dx === 0 ? 0 : (pts[i + 1][1] - pts[i][1]) / dx); }
    m[0] = d[0]; m[n - 1] = d[n - 2];
    for (i = 1; i < n - 1; i++) m[i] = (d[i - 1] * d[i] <= 0) ? 0 : (d[i - 1] + d[i]) / 2;
    for (i = 0; i < n - 1; i++) {
      if (d[i] === 0) { m[i] = 0; m[i + 1] = 0; continue; }
      var a = m[i] / d[i], b = m[i + 1] / d[i], s = a * a + b * b;
      if (s > 9) { var t = 3 / Math.sqrt(s); m[i] = t * a * d[i]; m[i + 1] = t * b * d[i]; }
    }
    var path = 'M' + f(pts[0][0]) + ' ' + f(pts[0][1]);
    for (i = 0; i < n - 1; i++) {
      var x0 = pts[i][0], y0 = pts[i][1], x1 = pts[i + 1][0], y1 = pts[i + 1][1], dx2 = (x1 - x0) / 3;
      path += 'C' + f(x0 + dx2) + ' ' + f(y0 + m[i] * dx2) + ' ' + f(x1 - dx2) + ' ' + f(y1 - m[i + 1] * dx2) + ' ' + f(x1) + ' ' + f(y1);
    }
    return path;
    function f(v) { return Math.round(v * 100) / 100; }
  }

  function Legend(props) {
    if (!props.series || props.series.length < 2) return null;
    return h('ul', { className: 'amb-legend', 'aria-label': 'Series' }, props.series.map(function (s, i) {
      return h('li', { key: i }, h('span', { className: cx('amb-key', props.line && 'is-line', 'amb-series-' + (i + 1)) }), s.name);
    }));
  }

  function Tip(props) {
    return h('div', { className: 'amb-tip', style: { left: props.x, top: props.y } },
      props.title != null ? h('div', { className: 'amb-tip-title' }, props.title) : null,
      props.rows.map(function (r, i) {
        return h('div', { className: 'amb-tip-row', key: i },
          h('span', null, r.key != null ? h('span', { className: cx('amb-key', 'amb-series-' + (r.key + 1)) }) : null, r.label),
          h('b', null, r.value));
      }));
  }

  function DataTable(props) {
    /* a visually hidden table so screen readers and copy-paste get the numbers */
    return h('div', { className: 'amb-sr' }, h('table', null,
      h('caption', null, props.caption || 'Chart data'),
      h('thead', null, h('tr', null, h('th', null, ''), props.series.map(function (s, i) { return h('th', { key: i }, s.name); }))),
      h('tbody', null, props.labels.map(function (l, i) {
        return h('tr', { key: i }, h('th', null, l), props.series.map(function (s, j) { return h('td', { key: j }, String(s.values[i])); }));
      }))));
  }

  /* ---------- LineChart ---------- */
  function LineChart(props) {
    var series = props.series || [], labels = props.labels || [];
    var height = props.height || 220;
    var fmt = props.format || function (v) { return compact(v, props.prefix); };
    var wm = useWidth(props.width || 600), ref = wm[0], width = wm[1];
    var hover = useState(null);
    var n = Math.max.apply(null, [0].concat(series.map(function (s) { return s.values.length; })));
    var max = Math.max.apply(null, [0].concat(series.map(function (s) { return Math.max.apply(null, s.values); })));
    var ticks = niceTicks(max, props.ticks || 4), top = ticks[ticks.length - 1];
    var endLabels = props.endLabels !== false;
    var pad = { l: 44, r: endLabels ? 52 : 12, t: 12, b: 28 };
    var W = width, H = height, iw = Math.max(10, W - pad.l - pad.r), ih = H - pad.t - pad.b;
    var xs = function (i) { return pad.l + (n <= 1 ? iw / 2 : i / (n - 1) * iw); };
    var ys = function (v) { return pad.t + ih - (top ? v / top * ih : 0); };
    var paths = series.map(function (s) { return monotonePath(s.values.map(function (v, i) { return [xs(i), ys(v)]; })); });
    var xTicks = []; var every = Math.max(1, Math.ceil(n / Math.max(2, Math.floor(iw / 80))));
    for (var i = n - 1; i >= 0; i -= every) xTicks.unshift(i);
    if (xTicks[0] !== 0 && xTicks[0] >= every / 2) xTicks.unshift(0); else if (xTicks[0] !== 0) xTicks[0] = 0;
    function onMove(e) {
      var r = ref.current.getBoundingClientRect(); var x = e.clientX - r.left;
      var idx = n <= 1 ? 0 : Math.round((x - pad.l) / iw * (n - 1)); idx = Math.max(0, Math.min(n - 1, idx));
      hover[1](idx);
    }
    var hi = hover[0];
    return h('div', { className: cx('amb-chart', props.className), ref: ref, onMouseMove: onMove, onMouseLeave: function () { hover[1](null); } },
      h(Legend, { series: series, line: true }),
      h('svg', { height: H, viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': props.title || 'Line chart' },
                ticks.map(function (t, i) {
          return h('g', { key: 't' + i },
            h('line', { className: i === 0 ? 'amb-baseline' : 'amb-grid-line', x1: pad.l, x2: pad.l + iw, y1: ys(t), y2: ys(t) }),
            h('text', { className: 'amb-tick', x: pad.l - 8, y: ys(t) + 4, textAnchor: 'end' }, fmt(t)));
        }),
        xTicks.map(function (i) { return h('text', { key: 'x' + i, className: 'amb-tick', x: xs(i), y: H - 8, textAnchor: i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle' }, labels[i]); }),
        props.area !== false ? series.map(function (s, si) {
          var pts = s.values.map(function (v, i) { return [xs(i), ys(v)]; });
          var d = monotonePath(pts) + 'L' + xs(s.values.length - 1) + ' ' + ys(0) + 'L' + xs(0) + ' ' + ys(0) + 'Z';
          return si === 0 ? h('path', { key: 'a' + si, className: 'amb-area amb-series-' + (si + 1), d: d, stroke: 'none' }) : null;
        }) : null,
        series.map(function (s, si) { return h('path', { key: 'l' + si, className: 'amb-line amb-series-' + (si + 1), d: paths[si] }); }),
        hi != null ? h('line', { className: 'amb-crosshair', x1: xs(hi), x2: xs(hi), y1: pad.t, y2: pad.t + ih }) : null,
        series.map(function (s, si) {
          var last = s.values.length - 1;
          return h('g', { key: 'e' + si },
            hi != null && hi <= last ? h('circle', { className: 'amb-hover-dot amb-series-' + (si + 1), cx: xs(hi), cy: ys(s.values[hi]), r: 5, stroke: undefined }) : null,
            hi == null ? h('circle', { className: 'amb-end-dot amb-series-' + (si + 1), cx: xs(last), cy: ys(s.values[last]), r: 4 }) : null,
            endLabels && hi == null ? h('text', { className: 'amb-end-label', x: xs(last) + 10, y: ys(s.values[last]) + 4 }, fmt(s.values[last])) : null);
        })),
      hi != null ? h(Tip, { x: xs(hi), y: pad.t + 8, title: labels[hi], rows: series.map(function (s, si) { return { key: series.length > 1 ? si : null, label: series.length > 1 ? s.name : (props.valueLabel || 'Value'), value: fmt(s.values[hi]) }; }) }) : null,
      h(DataTable, { caption: props.title, series: series, labels: labels }));
  }

  /* ---------- BarChart ---------- */
  function BarChart(props) {
    var series = props.series || [], labels = props.labels || [];
    var horizontal = !!props.horizontal, stacked = !!props.stacked;
    var fmt = props.format || function (v) { return compact(v, props.prefix); };
    var wm = useWidth(props.width || 600), ref = wm[0], width = wm[1];
    var hover = useState(null);
    var n = labels.length, S = series.length;
    var thick = props.thickness || 24, gap = 2;
    var totals = labels.map(function (_, i) { return stacked ? series.reduce(function (a, s) { return a + (s.values[i] || 0); }, 0) : Math.max.apply(null, series.map(function (s) { return s.values[i] || 0; })); });
    var max = Math.max.apply(null, [0].concat(totals));
    var ticks = niceTicks(max, props.ticks || 4), top = ticks[ticks.length - 1];
    var showValues = !!props.valueLabels;
    var height = props.height || (horizontal ? n * (thick + 14) + 24 : 220);
    var catW = horizontal ? (props.labelWidth || 96) : 0;
    var pad = horizontal ? { l: catW + 8, r: showValues ? 56 : 12, t: 8, b: 8 } : { l: 44, r: 8, t: showValues ? 20 : 12, b: 28 };
    var W = width, H = height, iw = Math.max(10, W - pad.l - pad.r), ih = H - pad.t - pad.b;
    var slot = horizontal ? ih / Math.max(1, n) : iw / Math.max(1, n);
    var perBar = stacked ? Math.min(thick, slot * 0.6) : Math.min(thick, (slot * 0.7 - gap * (S - 1)) / S);
    var groupSize = stacked ? perBar : perBar * S + gap * (S - 1);
    var scale = function (v) { return top ? v / top * (horizontal ? iw : ih) : 0; };
    var hi = hover[0];
    function barPath(x, y, w, hgt, rr) {
      /* rounded data end, square at the baseline */
      var r = Math.min(rr, w / 2, hgt);
      if (hgt <= 0 || w <= 0) return '';
      if (horizontal) { /* bar grows to the right: x is left, y is top */
        return 'M' + x + ' ' + y + 'H' + (x + w - r) + 'a' + r + ' ' + r + ' 0 0 1 ' + r + ' ' + r + 'V' + (y + hgt - r) + 'a' + r + ' ' + r + ' 0 0 1 -' + r + ' ' + r + 'H' + x + 'Z';
      }
      return 'M' + x + ' ' + (y + hgt) + 'V' + (y + r) + 'a' + r + ' ' + r + ' 0 0 1 ' + r + ' -' + r + 'H' + (x + w - r) + 'a' + r + ' ' + r + ' 0 0 1 ' + r + ' ' + r + 'V' + (y + hgt) + 'Z';
    }
    var bars = [], valueLabels = [];
    labels.forEach(function (lab, i) {
      var start = (horizontal ? pad.t : pad.l) + i * slot + (slot - groupSize) / 2;
      var acc = 0;
      series.forEach(function (s, si) {
        var v = s.values[i] || 0, len = scale(v);
        if (!stacked) acc = 0;
        var dim = hi != null && hi !== i;
        var key = 'b' + i + '-' + si;
        var isEnd = stacked ? si === S - 1 : true;
        if (horizontal) {
          var y = stacked ? start : start + si * (perBar + gap);
          var x = pad.l + scale(acc) + (stacked && si > 0 ? gap : 0);
          var w = Math.max(0, len - (stacked && si > 0 ? gap : 0));
          bars.push(h('path', { key: key, className: cx('amb-bar', 'amb-series-' + (si + 1), dim && 'is-dim'), d: isEnd ? barPath(x, y, w, perBar, 4) : 'M' + x + ' ' + y + 'h' + w + 'v' + perBar + 'h-' + w + 'Z', stroke: 'none' }));
          if (showValues && isEnd) valueLabels.push(h('text', { key: 'v' + key, className: 'amb-bar-label', x: pad.l + scale(acc + v) + 8, y: y + perBar / 2 + 4 }, fmt(stacked ? acc + v : v)));
        } else {
          var bx = stacked ? start : start + si * (perBar + gap);
          var by = pad.t + ih - scale(acc + v);
          var bh = Math.max(0, len - (stacked && si > 0 ? gap : 0));
          bars.push(h('path', { key: key, className: cx('amb-bar', 'amb-series-' + (si + 1), dim && 'is-dim'), d: isEnd ? barPath(bx, by, perBar, bh, 4) : 'M' + bx + ' ' + by + 'h' + perBar + 'v' + bh + 'h-' + perBar + 'Z', stroke: 'none' }));
          if (showValues && isEnd && S === 1) valueLabels.push(h('text', { key: 'v' + key, className: 'amb-bar-label', x: bx + perBar / 2, y: by - 6, textAnchor: 'middle' }, fmt(v)));
        }
        acc += v;
      });
    });
    var hits = labels.map(function (_, i) {
      var p = horizontal ? { x: pad.l, y: pad.t + i * slot, width: iw, height: slot } : { x: pad.l + i * slot, y: pad.t, width: slot, height: ih };
      return h('rect', Object.assign({ key: 'h' + i, className: 'amb-hit', onMouseEnter: function () { hover[1](i); } }, p));
    });
    var tipX, tipY;
    if (hi != null) {
      if (horizontal) { tipX = pad.l + Math.min(iw, scale(totals[hi])) ; tipY = pad.t + hi * slot + slot / 2 + 10; }
      else { tipX = pad.l + hi * slot + slot / 2; tipY = pad.t + 4; }
    }
    return h('div', { className: cx('amb-chart', props.className), ref: ref, onMouseLeave: function () { hover[1](null); } },
      h(Legend, { series: series }),
      h('svg', { height: H, viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': props.title || 'Bar chart' },
        horizontal ? null : ticks.map(function (t, i) {
          var y = pad.t + ih - scale(t);
          return h('g', { key: 't' + i },
            h('line', { className: i === 0 ? 'amb-baseline' : 'amb-grid-line', x1: pad.l, x2: pad.l + iw, y1: y, y2: y }),
            h('text', { className: 'amb-tick', x: pad.l - 8, y: y + 4, textAnchor: 'end' }, fmt(t)));
        }),
        horizontal ? h('line', { className: 'amb-baseline', x1: pad.l, x2: pad.l, y1: pad.t, y2: pad.t + ih }) : null,
        horizontal ? labels.map(function (lab, i) { return h('text', { key: 'c' + i, className: 'amb-cat-label', x: pad.l - 12, y: pad.t + i * slot + slot / 2 + 4, textAnchor: 'end' }, lab); })
                   : labels.map(function (lab, i) { var every = Math.max(1, Math.ceil(((props.labelWidth || 40)) / slot)); if (i % every) return null; return h('text', { key: 'c' + i, className: 'amb-tick', x: pad.l + i * slot + slot / 2, y: H - 8, textAnchor: 'middle' }, lab); }),
        bars, valueLabels, hits),
      hi != null ? h(Tip, { x: tipX, y: tipY, title: labels[hi], rows: series.map(function (s, si) { return { key: S > 1 ? si : null, label: S > 1 ? s.name : (props.valueLabel || 'Value'), value: fmt(s.values[hi] || 0) }; }).concat(stacked && S > 1 ? [{ key: null, label: 'Total', value: fmt(totals[hi]) }] : []) }) : null,
      h(DataTable, { caption: props.title, series: series, labels: labels }));
  }

  /* ---------- Ring ---------- */
  function Ring(props) {
    var size = props.size || 96, stroke = props.stroke || Math.max(6, Math.round(size / 11));
    var value = Math.max(0, Math.min(100, Number(props.value) || 0));
    var r = (size - stroke) / 2, c = 2 * Math.PI * r;
    var text = props.text != null ? props.text : (Math.round(value * 100) / 100) + '%';
    return h('div', { className: cx('amb-ring', props.className), role: 'img', 'aria-label': (props.label ? props.label + ': ' : '') + text },
      h('div', { style: { position: 'relative', width: size, height: size } },
        h('svg', { width: size, height: size, viewBox: '0 0 ' + size + ' ' + size, 'aria-hidden': 'true' },
          h('circle', { className: 'amb-ring-track', cx: size / 2, cy: size / 2, r: r, strokeWidth: stroke }),
          h('circle', { className: cx('amb-ring-fill', props.tone && 'is-' + props.tone), cx: size / 2, cy: size / 2, r: r, strokeWidth: stroke, strokeDasharray: c, strokeDashoffset: c * (1 - value / 100), transform: 'rotate(-90 ' + size / 2 + ' ' + size / 2 + ')' })),
        h('div', { className: 'amb-ring-center', style: { height: size } },
          h('span', { className: 'amb-ring-value', style: { fontSize: Math.max(13, Math.min(28, Math.round(size * 0.21))), lineHeight: 1.1 } }, text))),
      props.label ? h('span', { className: 'amb-ring-label' }, props.label) : null);
  }

  /* ---------- Stat ---------- */
  function Spark(props) {
    var vals = props.values || [], w = props.width || 96, hh = props.height || 32;
    if (vals.length < 2) return null;
    var max = Math.max.apply(null, vals), min = Math.min.apply(null, vals), span = max - min || 1;
    var pts = vals.map(function (v, i) { return [2 + i / (vals.length - 1) * (w - 4), 3 + (1 - (v - min) / span) * (hh - 6)]; });
    var d = monotonePath(pts), last = pts[pts.length - 1];
    return h('svg', { className: 'amb-spark', width: w, height: hh, viewBox: '0 0 ' + w + ' ' + hh, 'aria-hidden': 'true' },
      h('path', { className: 'amb-spark-area', d: d + 'L' + last[0] + ' ' + hh + 'L' + pts[0][0] + ' ' + hh + 'Z' }),
      h('path', { className: 'amb-spark-line', d: d }),
      h('circle', { className: 'amb-spark-dot', cx: last[0], cy: last[1], r: 3.5 }));
  }
  function Stat(props) {
    var value = typeof props.value === 'number' ? compact(props.value, props.prefix) : props.value;
    return h('div', { className: cx('amb-stat', props.className) },
      h('span', { className: 'amb-stat-label' }, props.label),
      h('span', { className: cx('amb-stat-value', props.hero && 'is-hero') }, value, props.unit ? h('span', { className: 'amb-stat-unit', style: { marginLeft: 6 } }, props.unit) : null),
      (props.delta != null || props.trend || props.caption) ? h('div', { className: 'amb-stat-foot' },
        h('span', { className: 'amb-row', style: { gap: 8 } },
          props.delta != null ? h(Delta, { value: props.delta, upIsGood: props.upIsGood, period: props.period }) : null,
          props.caption ? h('span', { className: 'amb-stat-unit' }, props.caption) : null),
        props.trend ? h(Spark, { values: props.trend, width: props.sparkWidth || 72, height: 28 }) : null) : null);
  }

  /* ---------- Sidebar ---------- */
  function Sidebar(props) {
    var items = props.items || [];
    var controlled = props.active != null;
    var st = useState(items.length ? (items[0].id || items[0].label) : null);
    var active = controlled ? props.active : st[0];
    function pick(it) { var id = it.id || it.label; if (!controlled) st[1](id); if (props.onSelect) props.onSelect(id, it); if (it.onClick) it.onClick(); }
    return h('nav', { className: cx('amb-sidebar', props.className), style: props.style, 'aria-label': props.label || 'Primary' },
      h('div', { className: 'amb-sidebar-brand' }, props.brand || h(Logo, { variant: 'lockup', size: 18 })),
      h('ul', { className: 'amb-nav' }, items.map(function (it, i) {
        if (it.section) return h('li', { key: 's' + i, className: 'amb-nav-section' }, it.section);
        var id = it.id || it.label;
        return h('li', { key: id }, h('button', { type: 'button', className: cx('amb-nav-item', active === id && 'is-active'), 'aria-current': active === id ? 'page' : undefined, onClick: function () { pick(it); } },
          it.icon ? h(Icon, { name: it.icon, size: 20 }) : null,
          h('span', null, it.label),
          it.badge != null ? h('span', { className: 'amb-nav-badge' }, it.badge) : null));
      })),
      props.footer ? h('div', { className: 'amb-sidebar-foot' }, props.footer) : null);
  }

  var api = { Logo: Logo, Icon: Icon, Button: Button, IconButton: IconButton, Toggle: Toggle, Select: Select, Badge: Badge, Delta: Delta, Card: Card, Stat: Stat, LineChart: LineChart, BarChart: BarChart, Ring: Ring, Sidebar: Sidebar, format: { compact: compact } };
  window.Ambiently = window.Ambiently || {};
  Object.assign(window.Ambiently, api);
})();
