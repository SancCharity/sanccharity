"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { PREVIEW_MODE } from "@/lib/constants";

export type WsEvent =
  | { type: "new_donation"; data: { campaignId: string; amount: number; tokenSymbol: string; donorAddress: string } }
  | { type: "vote_cast"; data: { campaignId: string; milestoneIndex: number; choice: string } }
  | { type: "milestone_updated"; data: { campaignId: string; milestoneIndex: number; status: string } }
  | { type: "campaign_completed"; data: { campaignId: string } }
  | { type: "campaign_created"; data: { campaignId: string; name: string } }
  | { type: "campaign_cancelled"; data: { campaignId: string } }
  | { type: "charity_registered"; data: { charityId: string; name: string } }
  | { type: "charity_verified"; data: { charityId: string } }
  | { type: "buyback_executed"; data: { sancBurned: string } }
  | { type: "contract_paused"; data: { contractName: string } }
  | { type: "contract_unpaused"; data: { contractName: string } };

type EventHandler = (event: WsEvent) => void;

const WS_URL = process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:8000/ws/charity";

export function useCharityWebSocket() {
  const wsRef = useRef<WebSocket | null>(null);
  const handlersRef = useRef<Set<EventHandler>>(new Set());
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [connected, setConnected] = useState(false);

  const dispatch = useCallback((event: WsEvent) => {
    handlersRef.current.forEach((h) => h(event));
  }, []);

  // In preview mode, simulate periodic events
  useEffect(() => {
    if (!PREVIEW_MODE) return;

    const interval = setInterval(() => {
      const campaigns = ["1", "2", "3", "4", "6"];
      const tokens = ["BNB", "SANC", "USDT"];
      dispatch({
        type: "new_donation",
        data: {
          campaignId: campaigns[Math.floor(Math.random() * campaigns.length)],
          amount: parseFloat((Math.random() * 5 + 0.1).toFixed(3)),
          tokenSymbol: tokens[Math.floor(Math.random() * tokens.length)],
          donorAddress: `0x${Math.random().toString(16).slice(2, 10)}...`,
        },
      });
    }, 15000); // new simulated donation every 15s

    return () => clearInterval(interval);
  }, [dispatch]);

  // Real WebSocket connection (only when not in preview mode)
  useEffect(() => {
    if (PREVIEW_MODE) return;

    const connect = () => {
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => setConnected(true);

      ws.onmessage = (e) => {
        try {
          const event = JSON.parse(e.data) as WsEvent;
          dispatch(event);
        } catch {
          // ignore malformed messages
        }
      };

      ws.onclose = () => {
        setConnected(false);
        reconnectTimer.current = setTimeout(connect, 5000);
      };

      ws.onerror = () => ws.close();
    };

    connect();

    return () => {
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      wsRef.current?.close();
    };
  }, [dispatch]);

  const on = useCallback((handler: EventHandler) => {
    handlersRef.current.add(handler);
    return () => handlersRef.current.delete(handler);
  }, []);

  return { on, connected: PREVIEW_MODE ? true : connected };
}
