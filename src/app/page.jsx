"use client";
import React, { useState, useEffect } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "@/ethereum/factory";
import Link from "next/link";

export default function Home() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const loadCampaigns = async () => {
      const campaigns = await factory.methods.getDeployedCampaigns().call();
      console.log("getDeployedCampaigns():", campaigns);
      setCampaigns(campaigns);
    };
    loadCampaigns();
  }, []);

  function renderCampaigns() {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: <Link href={`/campaigns/${address}`}>View Campaign</Link>,
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  }

  return (
    <div>
      <h3>Open Campaigns</h3>
      <Link href="/campaigns/create">
        <Button
          content="Create Campaign"
          icon="add circle"
          primary={true}
          floated="right"
        />
      </Link>
      {renderCampaigns()}
    </div>
  );
}
