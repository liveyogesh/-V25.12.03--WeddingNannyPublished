
import React from 'react';

const SocialShare: React.FC = () => {
  const shareUrl = window.location.href;
  const shareTitle = "The Wedding Nanny - Premium Childcare & Activity Corners for Indian Weddings";

  const shareLinks = [
    {
      name: 'Facebook',
      icon: 'fa-facebook-f',
      color: 'bg-[#1877F2]',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Twitter',
      icon: 'fa-x-twitter',
      color: 'bg-black',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`
    },
    {
      name: 'WhatsApp',
      icon: 'fa-whatsapp',
      color: 'bg-[#25D366]',
      url: `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`
    }
  ];

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-2 pointer-events-none">
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className={`${link.color} text-white w-10 h-10 rounded-r-lg flex items-center justify-center shadow-lg hover:w-14 transition-all duration-300 pointer-events-auto group`}
          title={`Share on ${link.name}`}
        >
          <i className={`fa-brands ${link.icon} text-sm group-hover:scale-110 transition-transform`}></i>
        </a>
      ))}
    </div>
  );
};

export default SocialShare;
