import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const BaseRequest = axios.create({
  baseURL: publicRuntimeConfig.backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default BaseRequest;
