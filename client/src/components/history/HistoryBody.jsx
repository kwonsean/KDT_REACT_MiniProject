import React, { useState } from 'react'
import DefaultHistoryInfo from './DefaultHistoryInfo'
import DetailHistoryInfo from './DetailHistoryInfo'

export default function HistoryBody({ item, userId }) {
  const [showDetail, setShowDetail] = useState(true)

  return (
    <div>
      {showDetail ? (
        <DefaultHistoryInfo
          item={item}
          setShowDetail={setShowDetail}
          showDetail={showDetail}
        />
      ) : (
        <DetailHistoryInfo
          order_id={item.order_id}
          user_id={userId}
          setShowDetail={setShowDetail}
          showDetail={showDetail}
        />
      )}
    </div>
  )
}
