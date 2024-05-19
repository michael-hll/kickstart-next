"use client";

import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import getCampaign from "@/ethereum/campaign";
import { web3 } from "@/ethereum/web3";
import { useRouter } from "next/navigation";
import { wait } from "@/utils/time";

export default function ContributeForm(props) {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const campaign = getCampaign(props.address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, "ether"),
      });
      // await wait(1000); // not sure if this wait help, sometimes the router.refresh() doesn't work
      //router.refresh();  // sometimes doesn't work, so used location.reload() js method
      location.reload();
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
      setValue("");
    }
  };

  return (
    <Form onSubmit={onSubmit} error={!!errorMessage}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          label="ether"
          placeholder="0.0"
          type="number"
          labelPosition="right"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Message error header="Oops!" content={errorMessage} />
        <Button loading={loading} primary>
          Contribute
        </Button>
      </Form.Field>
    </Form>
  );
}
