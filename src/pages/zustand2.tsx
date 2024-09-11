import { useBearStore } from '@/store/bear';
import { useShallow } from 'zustand/react/shallow';
import { memo, useEffect, useRef, useState } from 'react';
import { uniqueId } from 'lodash-es';
import { useCatStore } from '@/store/cat';

export default function ZustandPage() {
  const setBearName = useBearStore(({ setBearName }) => setBearName);

  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current++;
    // console.log('ZustandPage render count:', renderCount.current);
  }, [setBearName]);

  return (
    <>
      <BearWrapper />
      <CatWrapper />
    </>
  );
}

const BearWrapper = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { setBearName } = useBearStore();

  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current++;
  }, [setBearName]);

  useEffect(() => {
    ref.current?.classList.add('red');
    setTimeout(() => {
      ref.current?.classList.remove('red');
    }, 300);
  });

  return (
    <div className='wrapper' ref={ref}>
      <p className='title'>BearWrapper</p>
      <p>
        <b>BearWrapper</b>는 <b>useBearStore</b> 전체를 구독중이기 때문에 <b>CHANGE PAPA BEAR's NAME</b> 만으로도
        리랜더링이 발생합니
      </p>
      <button
        onClick={() => {
          setBearName({ key: 'papaBear', value: uniqueId() });
        }}
      >
        CHANGE PAPA BEAR's NAME
      </button>
      <BearChild />
      <BearMemoChild />
    </div>
  );
};

const BearChild = ({ isMemo }: { isMemo?: boolean }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mamaBear] = useBearStore(useShallow((state) => [state.mamaBear]));
  const renderCount = useRef(0);

  useEffect(() => {
    ref.current?.classList.add('orange');
    setTimeout(() => {
      ref.current?.classList.remove('orange');
    }, 300);
  });

  return (
    <div className='component' ref={ref}>
      <p className='title'>{isMemo ? `BearMemoChild` : `BearChild`}</p>
      <p>mamaBear : {mamaBear}</p>
      <p>
        {isMemo ? (
          <>
            <b>BearChild</b>와 모든게 동일하지만 <b>memo</b>로 감싸준 <b>BearMemoChild</b>는 <b>BearWrapper</b> 부모
            컴포넌트의 리렌더링과 상관없이 상태를 유지합니다.
          </>
        ) : (
          <>
            <b>BearChild</b>는 <b>useBearStore</b>의 <b>mamaBear</b>만 구독하고 있지만, <b>BearWrapper</b> 부모
            컴포넌트의 리렌더링에 맞춰 함께 리렌더링됩니다.
          </>
        )}
      </p>
    </div>
  );
};

const BearMemoChild = memo(() => BearChild({ isMemo: true }));

const CatWrapper = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [setCatName] = useCatStore(useShallow((state) => [state.setCatName]));

  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current++;
  }, [setCatName]);

  useEffect(() => {
    ref.current?.classList.add('red');
    setTimeout(() => {
      ref.current?.classList.remove('red');
    }, 300);
  });

  return (
    <div className='wrapper' ref={ref}>
      <p className='title'>CatWrapper</p>
      <p>
        <b>CatWrapper</b>는 오직 <b>setCatName</b>만 구독중이기 때문에 <b>setCatName</b> 자체가 변하지 않는 이상
        리랜더링 되지 않습니다.
      </p>
      <button
        onClick={() => {
          setCatName({ key: 'papaCat', value: uniqueId() });
        }}
      >
        CHANGE PAPA CAT's NAME
      </button>
      <button
        onClick={() => {
          setCatName({ key: 'mamaCat', value: uniqueId() });
        }}
      >
        CHANGE MAMA CAT's NAME
      </button>
      <CatChild1 />
      <CatChild2 />
    </div>
  );
};

const CatChild1 = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { mamaCat } = useCatStore();
  const renderCount = useRef(0);

  useEffect(() => {
    ref.current?.classList.add('orange');
    setTimeout(() => {
      ref.current?.classList.remove('orange');
    }, 300);
  });

  return (
    <div className='component' ref={ref}>
      <p className='title'>CatChild1</p>
      <p>mamaCat: {mamaCat}</p>
      <p>
        <b>CatChild1</b>는 실제로는 <b>mamaCat</b> 값만 사용하고 있지만 <b>useCatStore</b> 전체를 구독중이기 때문에
        <b>스토어 내부의 어떤 값</b>이 변하더라도 리랜더링됩니다.
      </p>
    </div>
  );
};

const CatChild2 = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const papaCat = useCatStore(({ papaCat }) => papaCat);

  useEffect(() => {
    ref.current?.classList.add('orange');
    setTimeout(() => {
      ref.current?.classList.remove('orange');
    }, 300);
  });

  return (
    <div className='component' ref={ref}>
      <p className='title'>CatChild2</p>
      <p>papaCat: {papaCat}</p>
      <p>
        <b>CatChild2</b> <b>papaCat</b>만 구독하고있기 때문에 <b>papaCat</b>값 변경시에만 리랜더링됩니다.
      </p>
    </div>
  );
};
