"use client";
import { usePathname } from "next/navigation";
import {
  Card,
  Link,
  Image,
  CardFooter,
  CardBody,
  Divider,
  CardHeader,
} from "@nextui-org/react";
import { Organizations, urlDTO } from "../types/index";
import {
  LinkedinOutlined,
  MailOutlined,
  GithubOutlined,
  GlobalOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { organizationsStore } from "../organizations";
import { Organizer } from "../types/Organizer";

const organizations: Organizations = organizationsStore;

export default function Group() {
  const group: string = usePathname().slice(1);

  return (
    <>
      <Card className='m-5'>
        <CardHeader className='font-bold'>
          {group.replace(/-/g, " ")}
        </CardHeader>
        <Divider />
        <CardBody>{organizations[group]?.about}</CardBody>
        <Divider />
        <CardFooter>
          <Link
            color='secondary'
            size='sm'
            isExternal
            isBlock
            showAnchorIcon
            href={organizations[group]?.org_url}
            target='_blank'
          >
            {organizations[group]?.org_url}
          </Link>
        </CardFooter>
      </Card>
      <Card className='m-5'>
        <CardHeader className='font-bold'>Organizers</CardHeader>
        <Divider />
        <div className='flex justify-evenly self-center flex-col sm:flex-row '>
          {organizations[group]?.organizers.map((e: Organizer, i: number) => (
            <Card
              isFooterBlurred={true}
              shadow='md'
              className='m-5 min-w-fit'
              key={`${e}${i}`}
            >
              <CardBody className='p-0'>
                <Image
                  shadow='none'
                  className='object-cover'
                  src={e.pfp}
                  width='250'
                  height='250'
                  alt='organizer profile picture'
                />
              </CardBody>
              <CardFooter className='absolute bg-white/30 bottom-0 items-center border-t-1 border-zinc-100/50 z-10 justify-between'>
                <p>{e.name}</p>
                <div className='flex items-center self-center gap-2'>
                  {e.links?.map((e: urlDTO, i: number) => {
                    const linked = Object.keys(e)[0];
                    let icon;
                    switch (linked) {
                      case "linkedin":
                        icon = (
                          <a
                            href={Object.values(e)[0]}
                            target='_blank'
                            key={Object.values(e)[0] + i}
                          >
                            <LinkedinOutlined />
                          </a>
                        );
                        break;
                      case "github":
                        icon = (
                          <a
                            href={Object.values(e)[0]}
                            target='_blank'
                            key={Object.values(e)[0] + i}
                          >
                            <GithubOutlined />
                          </a>
                        );
                        break;
                      case "email":
                        icon = (
                          <a
                            href={`mailto:${Object.values(e)[0]}`}
                            target='_blank'
                            key={Object.values(e)[0] + i}
                          >
                            <MailOutlined />
                          </a>
                        );
                        break;
                      case "portfolio":
                        icon = (
                          <a
                            href={Object.values(e)[0]}
                            target='_blank'
                            key={Object.values(e)[0] + i}
                          >
                            <GlobalOutlined />
                          </a>
                        );
                        break;
                      default:
                        icon = (
                          <a
                            href={Object.values(e)[0]}
                            target='_blank'
                            key={Object.values(e)[0] + i}
                          >
                            <LinkOutlined />
                          </a>
                        );
                        break;
                    }
                    return icon;
                  })}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Card>
    </>
  );
}
