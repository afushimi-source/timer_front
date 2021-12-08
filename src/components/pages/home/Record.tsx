import { useEffect } from "react";
import { Flex, Table, Thead, Tbody, Tr, Td, Th, Tfoot } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";

import { useRecord } from "hooks/useRecord";
import { recordsState } from "globalState/atoms/recordsAtom";

export const Record = () => {
  const { getRecords } = useRecord();
  const records = useRecoilValue(recordsState);

  useEffect(() => {
    getRecords();
  }, [getRecords]);

  return (
    <Flex align="center" justify="center" mt={5}>
      <Table
        variant="striped"
        colorScheme="cyan"
        w={{
          base: "100%",
          md: "60%",
        }}
      >
        <Thead>
          <Tr>
            <Th>日時</Th>
            <Th>計測時間</Th>
            <Th>休憩時間</Th>
          </Tr>
        </Thead>
        <Tbody>
          {records.map((record, index) => (
            <Tr key={index}>
              <Td>{record.createdAt}</Td>
              <Td>{record.studyTime}分</Td>
              <Td>{record.breakTime}分</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>日時</Th>
            <Th>計測時間</Th>
            <Th>休憩時間</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Flex>
  );
};
