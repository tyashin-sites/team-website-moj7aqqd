interface TeamMember {
  name: string;
  role: string;
  image?: string;
  bio?: string;
}

interface TeamProps {
  title?: string;
  subtitle?: string;
  members?: TeamMember[];
  children?: React.ReactNode;
  className?: string;
}

export function Team({ title, subtitle, members = [] }: TeamProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">{title}</h2>
            {subtitle && <p className="text-lg text-muted max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, i) => (
            <div key={i} className="text-center p-6">
              <div className="w-24 h-24 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">{member.name.charAt(0)}</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
              <p className="text-primary text-sm mb-2">{member.role}</p>
              {member.bio && <p className="text-muted text-sm">{member.bio}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;
