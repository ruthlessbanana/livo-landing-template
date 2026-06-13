import { PageRenderer, parsePageSpec } from "@livo/landing-kit";
import pageSpec from "../landing/page-spec.json";

const spec = parsePageSpec(pageSpec);

export default function Page() {
  return <PageRenderer spec={spec} />;
}
