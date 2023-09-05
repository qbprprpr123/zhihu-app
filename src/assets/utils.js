/**
 * 日期格式化
 */
export const formatTime = (time, template) => {
  let tempTime = time;
  let tempTemplate = template;
  if (typeof tempTime !== 'string') {
    tempTime = new Date().toLocaleString('zh-CN', { hour12: false });
  }
  if (typeof tempTemplate !== 'string') {
    tempTemplate = '{0}年{1}月{2}日 {3}:{4}:{5}';
  }
  let arr = [];
  if (/^\d{8}$/.test(tempTime)) {
    const [, $1, $2, $3] = /^(\d{4})(\d{2})(\d{2})$/.exec(tempTime);
    arr.push($1, $2, $3);
  } else {
    arr = tempTime.match(/\d+/g);
  }
  return tempTemplate.replace(/\{(\d+)\}/g, (_, $1) => {
    let item = arr[$1] || '00';
    if (item.length < 2) item = `0${item}`;
    return item;
  });
};

/**
 * 判断是否是 FormData
 */
export const isFormData = (formData) => !!formData && Object.prototype.toString.call(formData) === '[object FormData]';

/**
 * 判断是否是 Blob
 */
export const isBlobData = (blob) => !!blob && Object.prototype.toString.call(blob) === '[object Blob]';

/**
 * 是否是表单数据格式化
 */
export const isFormScheme = (d) => typeof d === 'string' && /([^&?]*)=([^&?]*)/i.test(d);

/**
 * 判断接口返回的code是否正确
 */
export const judgeCode = (code) => /^0$/.test(code);
