import React, { useState, useRef } from 'react';
import { nanoid } from 'nanoid';
import styles from './dynamicForm.less';
import ElForm from '@/components/ElForm';
import ElFormItem from '@/components/ElFormItem';

interface FormRef {
  submitForm: () => void
  resetForm: () => void
}
interface RadioGroup {
  id: string,
  value: string,
  label: string,
  checked: boolean,
}
interface TimeNode {
  [key: string]: string;
}
interface FormData {
  title: string;
  type: string;
  timeNodes: TimeNode[];
}

interface Rules {
  [key: string]: object;
}

const radioGroup: RadioGroup[] = [
  {
    id: 'horizontalAxis',
    value: '0',
    label: '横轴',
    checked: false,
  },
  {
    id: 'verticalAxis',
    value: '1',
    label: '纵轴',
    checked: false,
  },
];

const initialFormData: FormData = {
  title: '',
  type: '',
  timeNodes: [
    {
      id: nanoid(),
      time: '',
      content: '',
      link: '',
    },
  ],
};
const rules: Rules = {
  title: { required: true, message: '标题不能为空' },
  type: { required: true, message: '请选择类型' },
  time: { required: true, message: '时间不能为空' },
  content: { required: true, message: '内容不能为空' },
};

const DynamicFormPage = () => {
  const formRef = useRef<FormRef>();
  const [formData, setFormData] = useState<FormData>(initialFormData);

  function handleSubmit() {
    formRef.current?.submitForm();
  }

  function handleReset() {
    const newFormData = JSON.parse(JSON.stringify(initialFormData));
    setFormData({ ...newFormData });
    console.log('form', formData);
    radioGroup.forEach((item:RadioGroup) => {
      item.checked = false;
    });
    formRef.current?.resetForm();
  }

  function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'type') {
      const index = parseInt(value, 10);
      radioGroup.forEach((item:RadioGroup, itemIndex) => {
        item.checked = itemIndex === index;
      });
    }
  }

  function handleTimeNodesChange(event: React.ChangeEvent<HTMLInputElement>, index: number) {
    const { name, value } = event.target;
    const newTimeNodes = [...formData.timeNodes];
    newTimeNodes[index][name] = value;
    setFormData({ ...formData, timeNodes: newTimeNodes });
  }

  function handleMoveNode(index: number) {
    const newTimeNodes = Array.from(formData.timeNodes);
    [newTimeNodes[index], newTimeNodes[index + 1]] = [newTimeNodes[index + 1], newTimeNodes[index]];
    setFormData((prevFormData) => ({ ...prevFormData, timeNodes: newTimeNodes }));
  }

  function handleDeleteNode(index: number) {
    const newTimeNodes = [...formData.timeNodes].filter((node, num) => num !== index);
    setFormData({ ...formData, timeNodes: newTimeNodes });
  }

  function handleCreateNode() {
    const newTimeNodes = [...formData.timeNodes];
    newTimeNodes.push({
      id: nanoid(),
      time: '',
      content: '',
      link: '',
    });
    setFormData({ ...formData, timeNodes: newTimeNodes });
  }

  return (
    <ElForm ref={formRef} rules={rules} model={formData}>
      <ElFormItem label="标题：" prop="title">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleFormChange}
        />
      </ElFormItem>
      <ElFormItem label="类型：" prop="type">
        {radioGroup.map((item) => (
          <label htmlFor={item.id} key={item.value}>
            <input
              type="radio"
              name="type"
              id={item.id}
              value={item.value}
              checked={item.checked}
              onChange={handleFormChange}
            />
            {item.label}
          </label>
        ))}
      </ElFormItem>
      <div className={styles.formItem}>
        <ElFormItem label="时间节点：">
          <div>
            {
              formData.timeNodes.map((node, index) => (
                <div key={node.id} className={styles.timeNodes}>
                  <div className={styles.timeNodesForm}>
                    <ElFormItem label="时间：" prop={`timeNodes.${index}.time`}>
                      <input
                        type="text"
                        name="time"
                        value={node.time}
                        onChange={(event) => { handleTimeNodesChange(event, index); }}
                      />
                    </ElFormItem>
                    <ElFormItem label="内容：" prop={`timeNodes.${index}.content`}>
                      <input
                        type="text"
                        name="content"
                        value={node.content}
                        onChange={(event) => { handleTimeNodesChange(event, index); }}
                      />
                    </ElFormItem>
                    <ElFormItem label="链接：" prop={`timeNodes.${index}.link`}>
                      <input
                        type="text"
                        name="link"
                        value={node.link}
                        onChange={(event) => { handleTimeNodesChange(event, index); }}
                      />
                    </ElFormItem>
                  </div>
                  <div className={styles.timeNodesOperate}>
                    {(index !== 0) && (
                      <button
                        type="button"
                        className={styles.operateBtn}
                        onClick={() => { handleMoveNode(index - 1); }}
                      >
                        上移
                      </button>
                    )}
                    <button
                      type="button"
                      className={styles.operateBtn}
                      onClick={() => { handleDeleteNode(index); }}
                    >
                      删除
                    </button>
                    {(index !== formData.timeNodes.length - 1) && (
                      <button
                        type="button"
                        className={styles.operateBtn}
                        onClick={() => { handleMoveNode(index); }}
                      >
                        下移
                      </button>
                    )}
                  </div>
                </div>
              ))
            }
          </div>
        </ElFormItem>
      </div>
      <button type="button" className={styles.addBtn} onClick={handleCreateNode}>+ 添加节点</button>
      <div className={styles.bottomBtnGroup}>
        <button className={styles.bottomBtn} type="button" onClick={handleSubmit}>立即创建</button>
        <button className={styles.bottomBtn} type="button" onClick={handleReset}>重置</button>
      </div>
    </ElForm>
  );
};

export default DynamicFormPage;
