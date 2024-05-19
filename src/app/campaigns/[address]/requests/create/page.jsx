"use client";

import { useState } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import getCampaign from "@/ethereum/campaign";
import { web3 } from "@/ethereum/web3";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateRequest(props) {
  const [address, setAddress] = useState(props.params.address);
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const campaign = await getCampaign(address);
      const accounts = await web3.eth.getAccounts();
      const from = accounts[0];
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({ from });
      router.push(`/campaigns/${address}/requests`);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Link href={`/campaigns/${address}/requests`}>Back</Link>
      <h3>Create a Request</h3>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description of the request"
            type="text"
          />
        </Form.Field>

        <Form.Field>
          <label>Value in Ether</label>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Value of the request in Ether"
            type="number"
          />
        </Form.Field>

        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Address of the recipient"
            type="text"
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />
        <Button loading={loading} primary>
          Create!
        </Button>
      </Form>
    </div>
  );
}
