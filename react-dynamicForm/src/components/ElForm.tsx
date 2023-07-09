import React, {
  ReactNode, useImperativeHandle, useMemo, useRef, useEffect,
} from 'react';
import styles from './ElForm.less';
import myContext from '../utils/context';

interface TimeNode {
  [key: string]: string;
}

interface FormData {
  title: string;
  type: string;
  timeNodes: TimeNode[];
}

interface FormProps {
  children?: ReactNode;
  model: FormData,
  rules: object
}

const ElForm: React.FC<FormProps> = React.forwardRef((props, ref) => {
  const { model, children, rules } = props;
  const validateList = useRef<any>([]);
  const delValidateList = useRef<any>([]);
  const shouldValidate = useRef<boolean>(true);

  function validateForm() {
    const validates:any = [];
    validateList.current.forEach((item:any) => {
      validates.push(item());
    });
    const res = validates.every((item:any) => item === true);
    return res;
  }

  function submitForm() {
    if (validateForm()) {
      console.log('formData', model);
    }
  }

  function resetForm() {
    shouldValidate.current = false;
    delValidateList.current.forEach((item:any) => {
      item('');
    });
  }

  useEffect(() => {
    shouldValidate.current = false;
  }, []);

  useImperativeHandle(ref, () => ({
    submitForm,
    resetForm,
  }));

  const memoizedValue = useMemo(
    () => {
      validateList.current = [];
      function addFormValidate(validate: any) {
        validateList.current.push(validate);
      }
      function delFormValidate(emptyValidate: any) {
        delValidateList.current.push(emptyValidate);
      }
      return {
        rules, model, addFormValidate, delFormValidate, shouldValidate,
      };
    },
    [rules, model],
  );

  return (
    <myContext.Provider value={memoizedValue}>
      <form onSubmit={submitForm} className={styles.formDialog}>
        {children}
      </form>
    </myContext.Provider>

  );
});

export default ElForm;
