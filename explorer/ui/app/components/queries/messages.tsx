import { DocumentNode } from 'graphql'
import { gql, useQuery } from 'urql'
import { graphql } from '~/graphql'
import { XMsg, XMsgsDocument } from '~/graphql/graphql'

export const GetXMsg = (sourceChainID: string, destChainID: string, streamOffset: string): XMsg | null => {
  const [result] = useQuery({
    query: xmsg,
    variables: {
      sourceChainID,
      destChainID,
      streamOffset,
    },
  })
  const { data, fetching, error } = result
  // TODO handle error properly here
  if (!error) {
    return data as XMsg
  } else {
    return null
  }
}


export const xmsg = graphql(`
  query XMsg($sourceChainID: BigInt!, $destChainID: BigInt!, $streamOffset: BigInt!) {
    xmsg(sourceChainID: $sourceChainID, destChainID: $destChainID, streamOffset: $streamOffset) {
      StreamOffset
      SourceMessageSender
      DestAddress
      DestGasLimit
      SourceChainID
      DestChainID
      TxHash
      BlockHeight
      BlockHash
      Block {
        SourceChainID
        BlockHeight
        BlockHash
        Timestamp
      }
      Receipts {
        GasUsed
        Success
        RelayerAddress
        SourceChainID
        DestChainID
        StreamOffset
        TxHash
        Timestamp
      }
    }
  }
`)

export const xmsgrange = graphql(`
  query XMsgRange($from: BigInt!, $to: BigInt!) {
    xmsgrange(from: $from, to: $to) {
      StreamOffset
      SourceMessageSender
      DestAddress
      DestGasLimit
      SourceChainID
      DestChainID
      TxHash
      BlockHeight
      BlockHash
    }
  }
`)

export const xmsgcount = graphql(`
  query XMsgCount {
    xmsgcount
  }
`)

export const xmsgs: typeof XMsgsDocument = gql(`
  query XMsgs($cursor: BigInt, $limit: BigInt) {
    xmsgs(cursor: $cursor, limit: $limit) {
      TotalCount
      Edges {
        Cursor
        Node {
          ID
          StreamOffset
          SourceMessageSender
          DestAddress
          DestGasLimit
          SourceChainID
          DestChainID
          TxHash
          BlockHeight
          BlockHash
          Status
          SourceBlockTime
          ReceiptTxHash
        }
      }
      PageInfo {
        NextCursor
        PrevCursor
        HasNextPage
      }
    }
  }
`)
