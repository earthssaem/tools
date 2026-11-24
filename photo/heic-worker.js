// 아이폰 사진(HEIC·HEIF)을 푸는 일꾼. 한 장에 1~2초씩 걸려서 화면이 멈추지 않게 따로 돌린다.
// 받는 것: { id, buf }  /  돌려주는 것: { id, w, h, data }(RGBA) 또는 { id, error }
import factory from './lib/libheif-1.23.5/libheif-bundle.mjs';

let lib = null;
self.onmessage = async e => {
  const { id, buf } = e.data;
  try {
    lib ??= await factory();
    const images = new lib.HeifDecoder().decode(new Uint8Array(buf));
    if (!images.length) throw new Error('사진이 들어 있지 않습니다');
    const im = images[0], w = im.get_width(), h = im.get_height();
    const data = new Uint8ClampedArray(w * h * 4);
    await new Promise((res, rej) => im.display({ data, width: w, height: h }, d => (d ? res() : rej(new Error('풀지 못했습니다')))));
    for (const x of images) { try { x.free(); } catch { /* 이미 풀림 */ } }
    self.postMessage({ id, w, h, data: data.buffer }, [data.buffer]);
  } catch (err) {
    self.postMessage({ id, error: String(err?.message || err) });
  }
};
