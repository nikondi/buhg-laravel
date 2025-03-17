import {useForm, usePage} from "@inertiajs/react";
import {TRequestEditPage} from "@/Features/Request/types";
import {ChangeEventHandler, FormEventHandler, KeyboardEventHandler, useRef, useState} from "react";
import toast from "react-hot-toast";

export default function CommentForm() {
  const {comments, request} = usePage<TRequestEditPage>().props;
  const {data, setData, post, reset, processing} = useForm({text: '', request_id: request.id});
  const formRef = useRef<HTMLFormElement>(null);
  const [enterPressed, setEnterPressed] = useState(false)

  const send = () => {
    if(processing)
      return;
    post(route('comments.store'), {
      only: ['comments'],
      preserveScroll: true,
      onError: () => toast.error('Произошла ошибка'),
      onSuccess: () => {
        toast.success('Комментарий добавлен');
        reset();
      },
    });
  }

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    send();
  }

  const handleKeyUp: KeyboardEventHandler = (e) => {
    if(e.key == 'Enter' && !e.shiftKey)
      send();
  }
  const handleKeyDown: KeyboardEventHandler = (e) => {
    if(e.key == 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setEnterPressed(true);
    }
    else
      setEnterPressed(false);
  }
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    if(enterPressed)
      return;
    setData('text', e.target.value)
  }

  return <form onSubmit={handleSubmit} className="comment-form" ref={formRef}>
    <h2 className="text-2xl mb-4">Комментарии <span className="text-gray-500">{comments.data.length}</span></h2>
    <div className="comment-form__inputs">
      <textarea name="" value={data.text}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                onChange={handleChange} placeholder="Комментарий"/>
      <button type="submit">
        <svg width="1em" height="1em" viewBox="0 0 548.244 548.244"><path fillRule="evenodd" d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z" clipRule="evenodd" fill="currentColor"/></svg>
      </button>
    </div>
    <div className="text-sm text-gray-400">Enter - отправить, Shift + Enter - перенос строки</div>
  </form>
}
