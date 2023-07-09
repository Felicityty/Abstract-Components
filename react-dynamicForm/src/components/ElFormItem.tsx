import React, {
  ReactNode, useState, useContext, useEffect, useRef,
} from 'react';
import styles from './ElFormItem.less';
import myContext from '../utils/context';

interface FormItemProp {
  label: string;
  prop?: string;
  children?: ReactNode | any;
}

const ElFormItem: React.FC<FormItemProp> = (props) => {
  const { label, prop, children } = props;
  const {
    rules, model, addFormValidate, delFormValidate, shouldValidate,
  } = useContext(myContext);
  const [errors, setErrors] = useState<string>('');
  const isFirstRender = useRef(true);
  const value = prop && prop.split('.').reduce((obj, key) => obj[key], model);
  const attr: any = (prop && prop?.split('.') && prop.split('.').length > 1) ? prop?.split('.')[2] : prop;

  function validateField() {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return false;
    }
    if (attr && rules[attr] && !value) {
      setErrors(rules[attr].message);
      return false;
    }
    setErrors('');
    return true;
  }

  useEffect(() => {
    addFormValidate(validateField);
    delFormValidate(setErrors);
  });

  useEffect(() => {
    if (shouldValidate.current) {
      validateField();
    }
    isFirstRender.current = false;
  }, [value]);

  return (
    <div className={styles.formItem}>
      <span className={styles.itemRequired}>{rules[attr] && <span>*</span>}</span>
      <span className={styles.formItemLabel}>{label}</span>
      <div>
        {children}
        <div className={styles.itemFormError}>{ errors}</div>
      </div>
    </div>
  );
};

ElFormItem.displayName = 'formItem';

export default ElFormItem;
