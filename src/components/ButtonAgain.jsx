import { Button } from 'antd-mobile';
import { useState } from 'react';

const ButtonAgain = (props) => {
  const options = { ...props };
  const { children, onClick: handle } = options;
  delete options.children;

  // 状态
  const [loading, setLoading] = useState(false);
  const clickHandle = async () => {
    setLoading(true);
    try {
      await handle();
    } catch (e) {
      return e;
    }
    setLoading(false);
  };

  if (handle) options.onClick = clickHandle;
  return (
    <Button {...options} loading={loading}>
      {children}
    </Button>
  );
};

export default ButtonAgain;
