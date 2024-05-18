"use client";

import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import factory from "@/ethereum/factory";
import { web3 } from "@/ethereum/web3";
import { useRouter } from "next/navigation";

export default (props) => {
  const [minimumContribution, setMinimumContribution] = useState(0);
  const [errorMessages, setErrorMessages] = useState("");
  const [createEnabled, setCreateEnabled] = useState(true);
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorMessages("");
    setCreateEnabled(false);
    try {
      const accounts = await web3.eth.getAccounts();
      const result = await factory.methods
        .createCampaign(minimumContribution)
        .send({
          from: accounts[0],
        });
      console.log(result);
      router.push("/");
    } catch (err) {
      //console.error('Error:', err);
      setErrorMessages(
        err.message || "An error occurred while creating the campaign"
      );
    } finally {
      setCreateEnabled(true);
    }
  };
  return (
    <div>
      <h3>Create a Campaign</h3>
      <Form onSubmit={onSubmit} error={!!errorMessages}>
        <Form.Field>
          <label>Minimum Contribution (Wei)</label>
          <Input
            placeholder="minimum 100"
            type="number"
            label="wei"
            labelPosition="right"
            value={minimumContribution}
            onChange={(e) => setMinimumContribution(e.target.value)}
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessages} />
        <Button
          loading={!createEnabled}
          disabled={!createEnabled}
          type="submit"
          primary
        >
          Create!
        </Button>
      </Form>
    </div>
  );
};
