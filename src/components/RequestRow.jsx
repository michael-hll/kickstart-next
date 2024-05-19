"use client";

import React from "react";
import { Table, Button } from "semantic-ui-react";
import { web3 } from "@/ethereum/web3";
import getCampaign from "@/ethereum/campaign";

export default function RequestRow(props) {
  const { Row, Cell } = Table;
  const { id, request, address, approversCount } = props;
  const readyToFinalize =
    Number(request.approvalCount) > Number(approversCount) / 2;
  console.log("request:", request);

  async function onApprove() {
    const campaign = await getCampaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(id).send({ from: accounts[0] });
  }

  async function onFinalize() {
    const campaign = await getCampaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(id).send({ from: accounts[0] });
  }

  return (
    <Row
      disabled={request.complete}
      positive={readyToFinalize && !request.complete}
    >
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
      <Cell>{request.recipient} </Cell>
      <Cell>{`${request.approvalCount.toString()}/${approversCount.toString()}`}</Cell>
      <Cell>
        {request.complete ? null : (
          <Button color="green" basic onClick={onApprove}>
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {request.complete || !readyToFinalize ? null : (
          <Button color="teal" basic onClick={onFinalize}>
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
}
