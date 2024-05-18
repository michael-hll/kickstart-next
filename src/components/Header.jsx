"use client";

import React from "react";
import { Menu } from "semantic-ui-react";
import Link from "next/link";

export default () => {
  return (
    <Menu style={{ marginTop: "20px" }}>
      <Menu.Item name="CrowdCoin">
        <Link href="/">CrowdCoin</Link>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item name="campaigns">
          <Link href="/">Campaigns</Link>
        </Menu.Item>
        <Menu.Item name="add">
          <Link href="/campaigns">+</Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};
