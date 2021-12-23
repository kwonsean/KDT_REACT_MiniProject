import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts'

// const data = [
//   {
//     subject: 'Math',
//     A: 120,
//     B: 110,
//     fullMark: 150,
//   },
//   {
//     subject: 'Chinese',
//     A: 98,
//     B: 130,
//     fullMark: 150,
//   },
//   {
//     subject: 'English',
//     A: 86,
//     B: 130,
//     fullMark: 150,
//   },
//   {
//     subject: 'Geography',
//     A: 99,
//     B: 100,
//     fullMark: 150,
//   },
//   {
//     subject: 'Physics',
//     A: 85,
//     B: 90,
//     fullMark: 150,
//   },
//   {
//     subject: 'History',
//     A: 65,
//     B: 85,
//     fullMark: 150,
//     fill: '#83a6ed',
//   },
// ]

export default function Chart({ userId, setSelectedCategory }) {
  const [data, setData] = useState([])
  useEffect(() => {
    axios
      .post('api/order?type=userStat', {
        user_id: userId,
      })
      .then((response) => {
        let data = response.data.json
        let sum = []

        // 필요한 데이터만 추출 (category1, amount)
        data = data.map((item) => ({
          category: item.category1,
          amount: item.amount,
        }))
        // console.log(data) //[{category: 카테고리명, amoutn: 양}]

        // 현재 로직: data배열을 이중 for문으로 돌면서 첫 요소와 나머지 모든 요소를 비교한다
        // 카테고리가 같고, 요소 자기자신이 아닌 경우 첫번째 조건문을 통과하며 그 안에서 isAlreadySum값에 따라 합을 더 할지 말지 결정한다
        // 두번째 조건문은 모든 요소를 끝까지 조회를 했으며, 선택했던 요소의 카테고리가 새로운 카테고리일 경우 sum배열에 push를 해준다.
        // 이때 push된 데이터는 카테고리명을 가지고 있고, 같은 카테고리 이름을 가진 요소들의 amount의 합을 가지고 있으며 sum배열에는 카테고리 중복없이 데이터들이 들어가 있게 된다.
        for (let i = 0; i < data.length; i++) {
          for (let j = i; j < data.length; j++) {
            // sum에 없는 새로운 카테고리가 나온 경우 => isAlreadySum : undefined
            let isAlreadySum = sum.find(
              (item) => item.category === data[i].category
            )
            if (data[i].category === data[j].category && i !== j) {
              if (isAlreadySum) {
                break
              } else {
                data[i].amount += data[j].amount
              }
            }
            if (j === data.length - 1 && isAlreadySum === undefined) {
              sum.push(data[i])
            }
          }
        }
        // console.log('sum!!', sum) // 중복 없는 카테고리별 합계
        setData(sum)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <RadarChart
      cx={250}
      cy={250}
      outerRadius={150}
      width={500}
      height={500}
      data={data}
    >
      <PolarGrid />
      <PolarAngleAxis
        dataKey='category'
        onClick={(e) => setSelectedCategory(e.value)}
        style={{ cursor: 'pointer' }}
      />

      <PolarRadiusAxis />
      <Radar
        name='Mike'
        dataKey='amount'
        stroke='#8884d8'
        fill='#8884d8'
        fillOpacity={0.6}
      />
    </RadarChart>
  )
}
