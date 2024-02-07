import { BasicInputField } from '@3o3/mystique-components'
import { Button } from '@fe3o3/ui'
import React, { Fragment, useState } from 'react'

import KeyValueTable from '~/components/KeyValueTable'
import SelectBox, { createOption } from '~/components/SelectBox'

interface 템플릿치환자 {
  name: string
  key: string
  value: string
}

export default function FormRowSendTestMessage() {
  const options = [
    createOption('1', '1'),
    createOption('2', '2'),
    createOption('3', '3'),
  ]
  const [receiverId, setReceiverId] = useState(options[0].value)
  const [templateReplacers, setTemplateReplacers] = useState<템플릿치환자[]>([
    {
      name: '이름',
      key: 'name',
      value: '',
    },
    {
      name: '환급액',
      key: 'refund',
      value: '',
    },
    {
      name: '결재이용료',
      key: 'payment',
      value: '',
    },
  ])

  // # 기획 확인 내용
  // TODO 상위 Form의 action으로 해당 내용을 전달한다. 그런데 테스트 발송은 별도 페이지로 운영할 수 있지 않을까?
  // TODO 발송 내용은 초기화되어야 하는가?
  // TODO 테스트 발송이 현재 작성중인 친구톡 메시지와 관련성이 있을까?
  // TODO 카카오모먼트는 작성화면의 데이터를 직접 넣어서 발송하는 것으로 보인다. 준호님과 확인해서 진행하자.
  // TODO 메시지 타입은 다르지만, 테스트 발송은 공통화할 수 있을 것 같다. 추후 구현 이후에 다시 모아보자.

  return (
    <>
      <KeyValueTable.Root>
        {/* Whitelist */}
        <KeyValueTable.KeyColumn>Whitelist</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          <SelectBox
            value={receiverId}
            options={options}
            onChange={(v) => setReceiverId(v as string)}
          />
        </KeyValueTable.ValueColumn>
        {/* 템플릿 치환자 */}
        {templateReplacers.map(({ name, key, value }) => {
          return (
            <Fragment key={key}>
              <KeyValueTable.KeyColumn>{name}</KeyValueTable.KeyColumn>
              <KeyValueTable.ValueColumn>
                <BasicInputField
                  placeholder={`${name}을 입력해주세요`}
                  value={value}
                  onChange={(e) => {
                    if (e.target.value === value) {
                      return
                    }
                    setTemplateReplacers((prev) =>
                      prev.map((v) => {
                        if (v.key === key) {
                          return {
                            ...v,
                            value: e.target.value,
                          }
                        }

                        return v
                      })
                    )
                  }}
                />
              </KeyValueTable.ValueColumn>
            </Fragment>
          )
        })}
        <KeyValueTable.KeyColumn>버튼</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          <Button size="small" onClick={() => {}}>
            테스트 발송
          </Button>
        </KeyValueTable.ValueColumn>
      </KeyValueTable.Root>
    </>
  )
}
