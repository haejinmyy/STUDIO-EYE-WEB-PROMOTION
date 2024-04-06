import React from 'react'

export type SummaryBoxProps = {
    icon: string;
    title: string;
    description: string;
    division: 'statistics' | 'request'; // 추후 추가 가능성 있음
    children: React.ReactNode;
}

const SummaryBox = ({icon, title, description, division, children}:SummaryBoxProps) => {
  return (
    <div>
        <div>
         <div>
            <div>이미지</div>
            <h1>제목</h1>
            <h2>설명</h2>
         </div>
         <div>
            <div>정렬 버튼</div>
            <div>버튼</div>
            <div>버튼</div>
            <div>버튼</div>
         </div>
        </div>
        자식

    </div>
  )
}

export default SummaryBox