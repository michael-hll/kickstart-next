"use client";

import { useEffect, useState } from "react";
import getCampaign from "@/ethereum/campaign";
import { Card } from "semantic-ui-react";
import { web3 } from "@/ethereum/web3";

export default (props) => {
  const [campaign, setCampaign] = useState({});
  const [summary, setSummary] = useState({});
  const [minimumContribution, setMinimumContribution] = useState(0n);
  const [balance, setBalance] = useState(0n);
  const [requestCount, setRequestCount] = useState(0n);
  const [approversCount, setApproversCount] = useState(0n);
  const [manager, setManager] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) return;
    const loadCampaign = async () => {
      setLoading(true);
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
      setLoading(false);
    };
    loadCampaign();
  }, [loading, props.params.address]);

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
      {renderCampaignSummary()}
    </div>
  );
};
