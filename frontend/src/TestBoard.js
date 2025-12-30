import { Chessboard } from "react-chessboard";

export default function TestBoard() {
  return <Chessboard onSquareClick={() => alert("clicked")} />;
}
