import React from 'react';
import { IInvoiceItem } from '../../../@types/types';
import moneyFormat from '../../../helpers/moneyFormat';
import useWindowWidth from '../../../hooks/useWindowWidth';

import {
  TableWrapper,
  TableHead,
  Table,
  TableBody,
  ItemName,
  ItemPrice,
  ItemQuantity,
  ItemTotal,
  Total,
  TableFooter,
  Amount,
  MobileTable,
  InvoiceItem,
  ItemLeft,
} from './InvoiceTableStyles';

const InvoiceTable: React.FC<{ data: IInvoiceItem[]; total: number }> = ({
  data,
  total,
}) => {
  const windowWidth = useWindowWidth();
  return (
    <TableWrapper>
      {windowWidth! > 575 ? (
        <Table>
          <TableHead>
            <tr>
              <th>Item Name</th>
              <th>QTY.</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </TableHead>
          <TableBody>
            {data.map((item) => {
              return (
                <tr key={item.name}>
                  <ItemName>{item.name}</ItemName>
                  <ItemQuantity>{item.quantity}</ItemQuantity>
                  <ItemPrice>{moneyFormat(item.price)}</ItemPrice>
                  <ItemTotal>{moneyFormat(item.total)}</ItemTotal>
                </tr>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <MobileTable>
          {data.map((item) => (
            <InvoiceItem key={item.name}>
              <ItemLeft>
                <p>{item.name}</p>
                <span>{`${item.quantity} x ${moneyFormat(item.price)}`}</span>
              </ItemLeft>
              <p>{moneyFormat(item.total)}</p>
            </InvoiceItem>
          ))}
        </MobileTable>
      )}

      <TableFooter>
        <Amount>Amount Due</Amount>

        <Total>{moneyFormat(total)}</Total>
      </TableFooter>
    </TableWrapper>
  );
};

export default InvoiceTable;
