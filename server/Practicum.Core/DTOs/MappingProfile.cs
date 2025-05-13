using AutoMapper;
using Practicum.Core.IRepositories;
using Practicum.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.DTOs
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Project, ProjectDto>().ReverseMap();
            CreateMap<ReMark, ReMarkDto>().ReverseMap();
            CreateMap<ReMark, AddReMarkDto>().ReverseMap();
            CreateMap<Client, ClientDto>().ReverseMap();
            CreateMap<Questionnaire,QuestionnaireCreateDto>().ReverseMap();
            CreateMap<QuestionnaireFill, QuestionnaireFillCreateDto>().ReverseMap();

        }
    }
}
