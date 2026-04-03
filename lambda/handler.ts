export const handler = async (event: any) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Protected route accessed successfully",
      user: event.requestContext?.authorizer?.claims?.email ?? "unknown",
    }),
  };
};
