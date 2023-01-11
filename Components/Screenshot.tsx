import { useState, FormEvent } from 'react';
import axios from 'axios';
import Nprogress from 'nprogress';

Nprogress.configure({ showSpinner: false });

type response = {
  data: string;
};

const Screenshot = () => {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [sizeState, setSize] = useState(0);
  const [fullPage, setFull] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const sizeProperty = ['1920x1080', '1280x800', '420x740'];

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setDisabled(true);
      Nprogress.start();
     
      const result = await axios.get<response>(`https://screenshot.api.bestrui.top/?url=${url}&viewport=${sizeProperty[sizeState]}&fullPage=${fullPage}&encoding=base64`, {
        url, 
      });

      const { data } = result.data;

      const downloadLink = document.createElement('a');

      downloadLink.href = `${data}`;
      downloadLink.download = `${name}`;
      downloadLink.click();

      setDisabled(false);
      Nprogress.done();
    } catch (err) {
      Nprogress.done();
      setDisabled(false);
      if (err?.response?.data) {
        const { data } = err.response;
        const message = data.err;
        console.log(message);
      }
    }
  };

  return (
    <>
      <form onSubmit={submit}>
        <div className="input-container">
          <input type="text" placeholder="输入网址的链接" value={url} onChange={(e) => setUrl(e.target.value)} />
          <input type="text" placeholder="生成的截图名称" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="rc-container">
          <div className="radio">
            <input type="radio" name="size" id="desktop" defaultChecked={true} onChange={(e) => setSize(parseInt(e.target.defaultValue))} value={0} />
            <label className="radio-label" htmlFor="desktop">
              桌面
            </label>
          </div>
          <div className="radio">
            <input type="radio" name="size" id="tablet" value={1} onChange={(e) => setSize(parseInt(e.target.defaultValue))} />
            <label className="radio-label" htmlFor="tablet">
              平板
            </label>
          </div>
          <div className="radio">
            <input type="radio" name="size" id="phone" value={2} onChange={(e) => setSize(parseInt(e.target.defaultValue))} />
            <label className="radio-label" htmlFor="phone">
              手机
            </label>
          </div>
          <div className="checkbox">
            <input type="checkbox" id="fullpage" defaultChecked={fullPage} onChange={(e) => setFull(!fullPage)} />
            <label htmlFor="fullpage" /> <span>截长图</span>
          </div>
        </div>
        <div className="btn-container">
          <button type="submit" disabled={disabled} className="btn">
            生成截图
          </button>
        </div>
      </form>
    </>
  );
};

export default Screenshot;
