import React, { useState } from 'react';
import styles from './styles.module.css';

import Button from '../Button';
import Select from '../Select';

import classnames from 'classnames';

const FORMAT_ITEMS = [{
  name: '비디오',
  value: 'video',
}, {
  name: 'GIF',
  value: 'gif',
}];

type DownloadPanelProps = {
  onDownloadClick: (type: string) => Promise<void>,
};
function DownloadPanel({ onDownloadClick }: DownloadPanelProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [format, setFormat] = useState(FORMAT_ITEMS[0].value);

  const handleDownloadClick = async () => {
    setIsLoading(true);
    await onDownloadClick(format);
    setIsLoading(false);
  };

  return (
    <section className={classnames(styles.DownloadPanel, 'section py-3')}>
      <div className="field">
        <label className="label">파일 포멧</label>
        <Select items={FORMAT_ITEMS} selected={format} onChange={setFormat} />
        <p className="help">다운로드할 파일의 포멧을 선택합니다.</p>
      </div>
      <Button color="info" loading={isLoading} onClick={handleDownloadClick}>다운로드</Button>
    </section>
  );
}

DownloadPanel.defaultProps = {
  onDownloadClick: () => {},
};

export default DownloadPanel;