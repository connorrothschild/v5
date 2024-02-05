import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
  const { name, email, message } = req.body;

  const content = {
    to: "connorrothschild@gmail.com",
    from: "connor@connorrothschild.com",
    subject: `New Contact Form Submission from ${name}`,
    text: message,
    html: `<h1>New email submission from ${name}</h1><p>${message}</p><p>Reply to: ${email}</p>`,
  };

  try {
    await sendgrid.send(content);
    res.status(200).send("Message sent successfully.");
  } catch (error) {
    console.log("ERROR", error);
    res.status(400).send("Message not sent.");
  }
};
