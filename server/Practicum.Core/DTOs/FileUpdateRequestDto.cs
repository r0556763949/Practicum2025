﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.DTOs
{
    public class FileUpdateRequestDto
    {
        public string FileName { get; set; }
        public string Description { get; set; }
        public bool ReplaceContent { get; set; }
    }
}
