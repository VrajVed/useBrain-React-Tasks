# 03 c: Send later

Like "undo send" in Gmail: you click send, you get 3 seconds, and whatever is in the box after 3 seconds gets sent.

In the playground, type `see you`, click **Send in 3s**, then quickly change it to `see you at 5`. Open the Console (F12). It sent `see you`, the old text.

## Why

The `setTimeout` callback was created during the render when you clicked. It captured `message` **from that render**, like a photo. Typing later makes new renders with new values, but the old callback still holds the old photo.

A ref is the same box across all renders. If you keep the latest text in `ref.current`, the callback can look in the box when the timer fires and see what is there **now**.

## Your task

Keep the latest message in a `useRef` and send `ref.current` when the timer fires.

## Check

```bash
npm test -- 03-useRef/c
```
