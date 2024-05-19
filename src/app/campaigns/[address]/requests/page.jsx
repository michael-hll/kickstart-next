"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button, Table } from "semantic-ui-react";
import getCampaign from "@/ethereum/campaign";
import RequestRow from "@/components/RequestRow";

export default function ViewRequests(props) {
  const [address, setAddress] = useState(props.params.address);
  const [requests, setRequests] = useState([]);
  const [requestsCount, setRequestsCount] = useState(0);
  const [approversCount, setApproversCount] = useState(0);

  useEffect(() => {
    const loadRequests = async () => {
      const campaign = await getCampaign(address);
      const _requestsCount = await campaign.methods.getRequestsCount().call();
      const _approversCount = await campaign.methods.approversCount().call();
      const requestsAll = await Promise.all(
        Array(Number(_requestsCount)) // using the Number() function here is important to convert bigint to number
          .fill()
          .map((_, index) => {
            console.log("index:", index);
            return campaign.methods.requests(index).call();
          })
      );
      setRequests(requestsAll);
      setRequestsCount(_requestsCount);
      setApproversCount(_approversCount);
    };
    loadRequests();
  }, [address]);

  const { Header, Row, HeaderCell, Body } = Table;

  function renderRows() {
    console.log("requests length:", requests.length);
    return requests.map((request, index) => {
      console.log(index, request);
      return (
        <RequestRow
          key={index}
          request={request}
          address={address}
          id={index}
          approversCount={approversCount}
        />
      );
    });
  }

  return (
    <div>
      <h3>Requests</h3>
      <Link href={`/campaigns/${props.params.address}/requests/create`}>
        <Button primary floated="right" style={{ marginBottom: "10px" }}>
          Add Request
        </Button>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount (ETH)</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>{renderRows()}</Body>
      </Table>
      <div>Found {requestsCount.toString} requests.</div>
    </div>
  );
}
