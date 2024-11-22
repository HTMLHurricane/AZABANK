import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Popconfirm } from 'antd'
import { memo } from 'react'
import { Button } from '../..'

type Props = {
  onConfirm: () => void
}

const DeleteButton= ({ onConfirm }: Props) => {
  return (
    <Popconfirm
      onConfirm={() => onConfirm()}
      title="Вы действительно хотите удалить?"
    >
      <Button type="primary" icon={<FontAwesomeIcon icon={faTrash} />} danger>
        Удалить
      </Button>
    </Popconfirm>
  )
}

export default memo(DeleteButton)
