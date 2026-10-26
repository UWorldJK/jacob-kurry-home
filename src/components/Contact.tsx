import { forwardRef, useRef } from 'react';
import { profile, workloads } from '../content';
import { useWorkloadSection } from '../lib/cluster';
import { Shell } from './Shell';

export const Contact = forwardRef<HTMLInputElement>(function Contact(_, shellRef) {
  const ref = useRef<HTMLElement>(null);
  useWorkloadSection('contact', ref, workloads[workloads.length - 1].id);
  const github = profile.github.replace('https://', '');

  return (
    <section ref={ref} id="contact" className="block contact" aria-labelledby="contact-title">
      <p className="cmd">
        <span className="prompt">$</span> kubectl get svc,ingress -n jacob-kurry
      </p>
      <h2 id="contact-title" className="title">
        Get in touch
      </h2>
      <table className="svc">
        <thead>
          <tr>
            <th>NAME</th>
            <th>TYPE</th>
            <th>ENDPOINT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>service/mail</td>
            <td className="dim">LoadBalancer</td>
            <td>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </td>
          </tr>
          <tr>
            <td>service/cv</td>
            <td className="dim">ClusterIP</td>
            <td>
              <a href={profile.cv} target="_blank" rel="noreferrer">
                cv.pdf
              </a>
            </td>
          </tr>
          <tr>
            <td>ingress/github</td>
            <td className="dim">Ingress</td>
            <td>
              <a href={profile.github} target="_blank" rel="noreferrer">
                {github}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <Shell ref={shellRef} />
    </section>
  );
});
