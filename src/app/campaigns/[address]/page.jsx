"use client";

import { useEffect, useState } from "react";
import getCampaign from "@/ethereum/campaign";
import { Card, Grid } from "semantic-ui-react";
import { web3 } from "@/ethereum/web3";
import ContributeForm from "@/components/ContributeForm";
import Link from "next/link";

export default (props) => {
  const [campaign, setCampaign] = useState({});
  const [summary, setSummary] = useState({});
  const [address, setAddress] = useState("");
  const [minimumContribution, setMinimumContribution] = useState(0n);
  const [balance, setBalance] = useState(0n);
  const [requestCount, setRequestCount] = useState(0n);
  const [approversCount, setApproversCount] = useState(0n);
  const [manager, setManager] = useState("");

  useEffect(() => {
    const loadCampaign = async () => {
      setAddress(props.params.address);
      const campaignInstance = await getCampaign(props.params.address);
      const summary = await campaignInstance.methods.getSummary().call();
      console.log("getSummary():", summary, campaignInstance);
      // setCampaign(campaignInstance);
      // setSummary(summary);
      setMinimumContribution(summary["0"]);
      setBalance(summary["1"]);
      setRequestCount(summary["2"]);
      setApproversCount(summary["3"]);
      setManager(summary["4"]);
    };
    loadCampaign();
  }, []);

  function renderCampaignSummary() {
    const items = [
      {
        header: manager,
        meta: "Address of Manager",
        description:
          "The manager created this campaign can can create requests to withdraw money.",
        style: {
          overflowWrap: "break-word",
        },
      },
      {
        header: minimumContribution.toString(),
        meta: "Minimum Contribution (Wei)",
        description:
          "You must contribute at least this amount of Wei to become an approver.",
      },
      {
        header: requestCount.toString(),
        meta: "Number of Requests",
        description:
          "A request tries to withraw money from the contract. Requests must be approved by approvers.",
      },
      {
        header: approversCount.toString(),
        meta: "Number of Approvers",
        description: "Number of people who have donated to this campaign.",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ETH)",
        description:
          "The balance is how much money this campaign has left to spend.",
      },
    ];

    return <Card.Group items={items} />;
  }

  return (
    <div>
      <h3>Campaign Details</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>{renderCampaignSummary()}</Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={address} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Link href={`/campaigns/${address}/requests`}>View Requests</Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};
